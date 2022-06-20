import { Database } from "denodb";
import Guild from "./guildModel.ts";

import log from "framework/logger.ts";

export default class GuildRepository {
    constructor(private db: Database) {}

    async getGuildOrRegisterIt(guildId: bigint) {
        const guildKey = guildId.toString();
        let retrievedGuild = await Guild.select("id")
            .where("id", guildKey)
            .first();
        if (!retrievedGuild) {
            retrievedGuild = await Guild.create({ id: guildKey });
            log.info("Registered new guild in database", {
                guildId: guildId.toString(),
            });
        }
        return retrievedGuild;
    }
}
