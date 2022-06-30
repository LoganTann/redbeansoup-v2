import { Database, SQLite3Connector } from "denodb";

import Guild from "./classes/guildModel.ts";
import Lore from "./classes/loreModel.ts";

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

const dbPath = "./database/db.sqlite";
const isDbExists = isFileExists(dbPath); // should be called before the connector

const connector = new SQLite3Connector({
    filepath: dbPath,
});

const db = new Database(connector);

db.link([Guild, Lore]);

/**
 * Due to a known issue ({@link https://github.com/eveningkid/denodb/issues/283}), sync without
 * drop is not working. Please delete the database file when a model is changed.
 */
if (!isDbExists) {
    await db.sync();
}

export default db;
