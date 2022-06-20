/**
 * This file builds the bot client
 */

import env from "config";
import {
    BotWithCache,
    BotWithHelpersPlugin,
    createBot,
    enableCachePlugin,
    enableCacheSweepers,
    enableHelpersPlugin,
    enablePermissionsPlugin,
    GatewayIntents,
} from "discordeno";
import { Database } from "denodb";
import CommandManager from "framework/classes/CommandManager/CommandManager.ts";

// MAKE THE BASIC BOT OBJECT
const bot = createBot({
    token: env.BOT_TOKEN,
    botId: BigInt(atob(env.BOT_TOKEN.split(".")[0])),
    intents:
        GatewayIntents.Guilds |
        GatewayIntents.GuildMessages |
        GatewayIntents.MessageContent |
        GatewayIntents.GuildMessageReactions |
        GatewayIntents.GuildMessageTyping |
        GatewayIntents.GuildWebhooks,
    events: {},
});

// ENABLE ALL THE PLUGINS THAT WILL HELP MAKE IT EASIER TO CODE YOUR BOT
enableHelpersPlugin(bot);
enableCachePlugin(bot);
enableCacheSweepers(bot as BotWithCache);
enablePermissionsPlugin(bot as BotWithCache);

export interface BotClient extends BotWithCache<BotWithHelpersPlugin> {
    commands: CommandManager;
    database: Database;
}

export const Bot = bot as BotClient;

// PREPARE COMMANDS HOLDER
CommandManager.attachNewInstanceToBot(Bot);
