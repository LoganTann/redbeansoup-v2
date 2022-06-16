import { startBot } from "discordeno";

import log from "framework/logger.ts";
import { Bot } from "framework/bot.ts";
import { loadUserFiles } from "framework/fileloader.ts";

await loadUserFiles();

await Bot.commands.deploy();

log.info("[MOD.TS] Connecting to Discord...");
await startBot(Bot);
