import { Factory } from "https://deno.land/x/vno@1.5.1/dist/mod.ts";
import { checkCwdIsMainModule } from "framework/fileloader.ts";
import { log } from "framework/logger.ts";

const frontendFolder = "./web-front/";

/**
 * VueJs Project Bundler.
 */
export default async function buildVueApp() {
    FilesystemWatcher.registerWatcher();
    FilesystemWatcher.startLock();
    try {
        initDir();
        const vno = Factory.create();
        await vno.build();
        await moveBuildToCorrectFolder();
    } catch (e) {
        log.error("[web-front/build] Failed building the vuejs front-end", e);
    } finally {
        await cleanup();
        log.info(
            "[web-front/build] Vue files built. Don't forget to restart your browser tab."
        );
        FilesystemWatcher.releaseLock();
    }
}

function initDir() {
    checkCwdIsMainModule();
    Deno.chdir(frontendFolder);
}

async function moveBuildToCorrectFolder() {
    const originalDir = "./vno-build/";
    const targetDir = "./public/";
    const renameQueue: Array<{ from: string; to: string }> = [];
    for await (const file of Deno.readDir(originalDir)) {
        if (!file.isFile) {
            log.warn(`[web-front/build] ${file.name} is not a file. Ignoring.`);
            continue;
        }
        if (file.name === "build.js") {
            await patchBuildJs(originalDir, targetDir);
            continue;
        }
        renameQueue.push({
            from: originalDir.concat(file.name),
            to: targetDir.concat(file.name),
        });
    }
    await Promise.all(renameQueue.map(({ from, to }) => Deno.rename(from, to)));
}

async function cleanup() {
    await Promise.all([
        Deno.remove("vno-build", { recursive: true }),
        Deno.remove("vno-ssr", { recursive: true }),
    ]);
    Deno.chdir("../");
}

/**
 * Vno sucks
 */
async function patchBuildJs(originalDir: string, targetDir: string) {
    const filepath = originalDir.concat("build.js");
    const initialBuild = await Deno.readTextFile(filepath);
    const router = await Deno.readTextFile("./router/index.js");

    // we extract the portion of the router file to patch
    const findPortionToPatch = router.match(
        /BEGIN BUILD QUICKFIX\n([\w\W]*)\/\/ END BUILD QUICKFIX/
    );
    if (!findPortionToPatch || !findPortionToPatch[1]) {
        console.log(router);
        console.log(findPortionToPatch);
        throw new Error(
            `[web-front/build] Could not find portion to patch in router.js`
        );
    }
    const replaceOut = findPortionToPatch[1].concat(
        "$1.use(router);\n$1.mount("
    );

    // We then insert the portion at the correct position
    // ref : https://github.com/open-source-labs/vno/blob/main/core/factory/Factory.ts#L34
    const regexIn = /(vno\d+).mount\(/;
    const patchedContent = initialBuild
        .replace(regexIn, replaceOut)
        // We also fix dependancies
        .replace(
            'import * as Vue from "https://cdn.jsdelivr.net/npm/vue@3.0.5/dist/vue.esm-browser.js";',
            ""
        );

    await Deno.writeTextFile(targetDir.concat("build.js"), patchedContent);
}

class FilesystemWatcher {
    static enabled = false;
    static lock = false;

    static modifiedDuringLockHold = false;
    static buildCooldown: null | number = null;

    static startLock() {
        FilesystemWatcher.lock = true;
    }
    static releaseLock() {
        FilesystemWatcher.lock = false;
    }

    /**
     * Should run in parallel (without async)
     */
    static async registerWatcher() {
        if (FilesystemWatcher.enabled) {
            return;
        }
        FilesystemWatcher.enabled = true;
        const watcher = Deno.watchFs(frontendFolder, { recursive: true });
        for await (const event of watcher) {
            if (event.kind !== "modify") {
                continue;
            }
            const shouldReload = event.paths.some((path) =>
                path.toLocaleLowerCase().includes(".vue")
            );
            if (!shouldReload) {
                continue;
            }
            if (FilesystemWatcher.buildCooldown) {
                clearTimeout(FilesystemWatcher.buildCooldown);
            }
            FilesystemWatcher.buildCooldown = setTimeout(() => {
                if (!FilesystemWatcher.lock) {
                    buildVueApp();
                }
            }, 400);
        }
    }
}
