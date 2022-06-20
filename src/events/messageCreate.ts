import { Bot, BotClient } from "framework/bot.ts";
import { Message } from "discordeno";

import stickers from "./messageCreate/stickers/stickers.ts";
async function finalMiddlewares(bot: BotClient, message: Message) {
    await stickers(bot, message);
}

Bot.events.messageCreate = async (_bot, message) => {
    if (message.isBot) {
        return;
    }

    const normalizedMessage = message.content.trim();
    if (
        normalizedMessage.startsWith(Bot.commands.prefix) &&
        normalizedMessage.length > 1
    ) {
        const commandName = normalizedMessage
            .split(" ")[0]
            .slice(Bot.commands.prefix.length)
            .toLowerCase();
        Bot.commands.ifExists(commandName).runFromMessage(Bot, message);
    }
    await finalMiddlewares(Bot, message);
};
