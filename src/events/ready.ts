import { Bot } from "framework/bot.ts";
import log from "framework/logger.ts";
import { ActivityTypes } from "discordeno";

Bot.events.ready = (_, payload) => {
    log.info(
        `[READY] Shard ID ${payload.shardId + 1} of ${
            Bot.gateway.manager.totalShards
        } shards is ready!`
    );

    if (payload.shardId + 1 === Bot.gateway.manager.totalShards) {
        botFullyReady();
    }
};

// This function lets you run custom code when all your bot's shards are online.
async function botFullyReady() {
    await Bot.helpers.editBotStatus({
        status: "online",
        activities: [
            {
                name: "soup.kagescan.fr",
                type: ActivityTypes.Game,
                createdAt: Date.now(),
            },
        ],
    });
    log.info("[READY] Bot is fully online.");
}
