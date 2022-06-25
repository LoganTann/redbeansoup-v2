import { startBot } from "discordeno";

import log from "framework/logger.ts";

// Creates bot instance
import { Bot } from "framework/bot.ts";

// API + DB initialization
log.info("[MOD.TS] Starting backend...");
import "./web-back/mod.ts";

/*


// Load all commands and push them
import { loadUserFiles } from "framework/fileloader.ts";
await loadUserFiles();
await Bot.commands.deploy();

// Start the bot
log.info("[MOD.TS] Connecting to Discord...");
await startBot(Bot);
*/
