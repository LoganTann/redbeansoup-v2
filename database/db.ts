import { Database, PostgresConnector } from "denodb";
import env from "config";

import Guild from "./classes/guildModel.ts";
import Lore from "./classes/loreModel.ts";

console.log({
    database: env.DB_DATABASE,
    host: env.DB_HOST,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    port: env.DB_PORT,
});

const connector = new PostgresConnector({
    database: env.DB_DATABASE,
    host: env.DB_HOST,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    port: env.DB_PORT,
});

const db = new Database(connector);

db.link([Guild, Lore]);
db.sync();

export default db;
