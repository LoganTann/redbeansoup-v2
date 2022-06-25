import { startBot } from "discordeno";

import log from "framework/logger.ts";

// Creates bot instance
import { Bot } from "framework/bot.ts";

// Load all commands and push them
import { loadUserFiles } from "framework/fileloader.ts";
await loadUserFiles();
await Bot.commands.deploy();

// Start the bot
log.info("[MOD.TS] Connecting to Discord...");
await startBot(Bot);
