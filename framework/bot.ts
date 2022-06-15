/**
 * This file builds the bot client
 */

import { config } from "../config.ts";
import {
    BotWithCache,
    BotWithHelpersPlugin,
    Collection,
    createBot,
    enableCachePlugin,
    enableCacheSweepers,
    enableHelpersPlugin,
    enablePermissionsPlugin,
} from "../deps.ts";

import { log } from "./logger.ts";
import ICommand from "./types/ICommand.ts";

// MAKE THE BASIC BOT OBJECT
const bot = createBot({
    token: config.BOT_TOKEN,
    botId: BigInt(atob(config.BOT_TOKEN.split(".")[0])),
    intents: ["Guilds", "GuildMessages"],
    events: {},
});

// ENABLE ALL THE PLUGINS THAT WILL HELP MAKE IT EASIER TO CODE YOUR BOT
enableHelpersPlugin(bot);
enableCachePlugin(bot);
enableCacheSweepers(bot as BotWithCache);
enablePermissionsPlugin(bot as BotWithCache);

export interface BotClient extends BotWithCache<BotWithHelpersPlugin> {
    /**
     * Stores the commands that the bot has registered
     */
    commands: Collection<string, ICommand>;
    /**
     * Associate the group name with commands' names
     */
    cmdGroup: Record<string, string[]>;
}

export const Bot = bot as BotClient;
// PREPARE COMMANDS HOLDER
Bot.commands = new Collection();
Bot.cmdGroup = {};
