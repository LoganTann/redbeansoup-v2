import { Database, SQLite3Connector } from "denodb";

import Guild from "./classes/guildModel.ts";
import Lore from "./classes/loreModel.ts";

const connector = new SQLite3Connector({
    filepath: "./database/db.sqlite",
});

const db = new Database(connector);

db.link([Guild, Lore]);
await db.sync();

export default db;
