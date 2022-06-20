import { Database, MySQLConnector } from "denodb";
import env from "config";

import Guild from "./classes/guildModel.ts";
import Lore from "./classes/loreModel.ts";

const connector = new MySQLConnector({
    database: env.MYSQL_DATABASE,
    host: "localhost",
    username: "root",
    password: env.MYSQL_ROOT_PASSWORD,
    port: 5432,
});

const db = new Database(connector);

db.link([Guild, Lore]);
db.sync();

export default db;
