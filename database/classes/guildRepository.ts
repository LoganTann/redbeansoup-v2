import { Database } from "denodb";
import Guild from "./guildModel.ts";

import log from "framework/logger.ts";

export default class GuildRepository {
    constructor(private db: Database) {}

    async registerGuild(guildId: bigint) {
        const retrievedGuild = await Guild.create({
            guildId: guildId.toString(),
        });
        log.info("Registered new guild in database", {
            guildId: guildId.toString(),
        });
        return retrievedGuild;
    }
}
