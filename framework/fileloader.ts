/**
 * Inspiration from Discordeno fileloader plugin
 * @license Apache-2.0
 * @source https://github.com/discordeno/discordeno/blob/main/plugins/fileloader/mod.ts
 */

import { log } from "framework/logger.ts";

const rootPath = Deno.mainModule.substring(0, Deno.mainModule.lastIndexOf("/"));

/**
 * Framework function that autoloads files of user's code.
 */
export async function loadUserFiles() {
    log.info("[AUTOLOAD] Loading user files...");
    checkCwdIsMainModule();
    const filesToLoad = findFilesToLoad(["src/commands", "src/events"]);
    const filesCount = filesToLoad.length;
    await Deno.writeTextFile("fileloader.ts", filesToLoad.join("\n"));
    await import(`${rootPath}/fileloader.ts`);
    log.info(`[AUTOLOAD] Loaded ${filesCount} files.`);
}

function findFilesToLoad(loadList: Array<string>): Array<string> {
    const filesToLoad: Array<string> = [];
    for (const folder of loadList) {
        const folderContent: Iterable<Deno.DirEntry> = Deno.readDirSync(folder);
        if (folder === "src/commands") {
            loadCommandsToSet(folderContent, filesToLoad);
        } else {
            loadFilesInFolder(folder, folderContent, filesToLoad);
        }
    }
    return filesToLoad.map(
        (file, counter) => `import "${rootPath}/${file}#${counter}";`
    );
}

/**
 * Throws an error if current working directory is not the main module.
 */
function checkCwdIsMainModule() {
    let cwd = Deno.cwd();
    const mainModule = Deno.mainModule
        .replace(/file\:\/\/\/|\/mod.ts/g, "")
        .replace(/\//g, "\\");
    if (cwd !== mainModule && cwd.substring(1) !== mainModule) {
        throw new Error(`[AUTOLOAD] CWD is not the main module. Please run this script from the main module.
    There is a high probability that the autoloading will not work, making the connecting process stuck.
    CWD is [${cwd}], Main Module is [${mainModule}]
        `);
    }
}

/**
 * @param file - file path
 * @returns true if file exists, false otherwise
 */
function isFileExists(file: string) {
    try {
        return Deno.statSync(file).isFile;
    } catch (_error) {
        return false;
    }
}

/**
 * Loads all files from folder (not recursive)
 * @param folderContent
 * @param arrayReference
 */
function loadFilesInFolder(
    folderPath: string,
    folderContent: Iterable<Deno.DirEntry>,
    arrayReference: Array<string>
) {
    for (const file of folderContent) {
        if (file.isFile && file.name.endsWith(".ts")) {
            arrayReference.push(`${folderPath}/${file.name}`);
        }
    }
}

/**
 * Loading process of commands is similar to the Salesforce LWC framework. It load all the following files :
 *  "~/src/commands/<commandName>/<commandName>.ts"
 *
 * @param srcCommandFolderContent - content of `~/src/commands` folder
 * @param arrayReference - The array that will be filled with located files
 */
function loadCommandsToSet(
    srcCommandFolderContent: Iterable<Deno.DirEntry>,
    arrayReference: Array<string>
) {
    for (const commandDir of srcCommandFolderContent) {
        if (!commandDir.isDirectory) {
            continue;
        }
        const cmdName = commandDir.name;
        const relativePath = `src/commands/${cmdName}/${cmdName}.ts`;
        if (!isFileExists(relativePath)) {
            log.error(
                `[AUTOLOAD] Command ${cmdName} : ${relativePath} is not a file.`
            );
            continue;
        }
        arrayReference.push(relativePath);
    }
}
