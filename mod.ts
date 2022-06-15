import { startBot } from "./deps.ts";

import log from "./framework/logger.ts";
import { Bot } from "./framework/bot.ts";
import { loadUserFiles } from "./framework/fileloader.ts";

await loadUserFiles();

log.info("Connecting to Discord...");

await startBot(Bot);
