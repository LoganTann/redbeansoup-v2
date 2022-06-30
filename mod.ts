import { startBot } from "discordeno";
import log from "framework/logger.ts";
import { loadUserFiles } from "framework/fileloader.ts";

// Creates bot instance
import { Bot } from "framework/bot.ts";

// API + DB initialization
log.info("[MOD.TS] Starting backend...");
import "./web-back/mod.ts";

if (!Deno.args.includes("--start-dashboard-only")) {
    // Load all commands and push them
    await loadUserFiles();
    await Bot.commands.deploy();

    // Start the bot
    log.info("[MOD.TS] Connecting to Discord...");
    await startBot(Bot);
} else {
    log.info("Backend started.");
    log.info("--start-dashboard-only flag was set, discord bot won't start.");
}
