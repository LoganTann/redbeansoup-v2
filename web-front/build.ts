import { Factory } from "https://deno.land/x/vno@1.5.1/dist/mod.ts";
import { checkCwdIsMainModule } from "framework/fileloader.ts";
import { log } from "framework/logger.ts";

export default async function buildVueApp() {
    initDir();
    const vno = Factory.create();
    await vno.build();
    await moveBuildToCorrectFolder();
    await cleanup();
}

function initDir() {
    checkCwdIsMainModule();
    Deno.chdir("./web-front/");
}
async function moveBuildToCorrectFolder() {
    const originalDir = "./vno-build/";
    const targetDir = "./public/";
    const asyncOperations = [];
    for await (const file of Deno.readDir(originalDir)) {
        if (!file.isFile) {
            log.warn(`[web-front/build] ${file.name} is not a file. Ignoring.`);
            continue;
        }
        if (file.name === "build.js") {
            await patchBuildJs(originalDir, targetDir);
            continue;
        }
        asyncOperations.push(
            Deno.rename(
                originalDir.concat(file.name),
                targetDir.concat(file.name)
            )
        );
    }
    await Promise.all(asyncOperations);
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
            'https://cdn.jsdelivr.net/npm/vue@3.0.5/dist/vue.esm-browser.js";',
            [
                'https://unpkg.com/vue@3.2.37/dist/vue.esm-browser.js";',
                'import {VueRouterBuilder} from "./vue-router.js";',
                "const VueRouter = VueRouterBuilder({}, Vue);",
            ].join("\n")
        );

    await Deno.writeTextFile(targetDir.concat("build.js"), patchedContent);
}
