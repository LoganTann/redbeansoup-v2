import { Client } from "mysql";
import env from "config";

import guildModel from "./classes/guildModel.ts";
import loreModel from "./classes/loreModel.ts";

const client = await new Client().connect({
    hostname: env.MYSQL_HOST,
    username: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    db: env.MYSQL_DATABASE,
    poolSize: 3,
});

async function loadTables() {
    const requests = [guildModel, loreModel].map((model) =>
        client.query(model.createTable)
    );
    await Promise.all(requests);
}
try {
    await loadTables();
} catch (e) {
    console.error(e);
    Deno.exit(1);
}

export default client;
