import { Bot } from "../../framework/bot.ts";
import log from "../../framework/logger.ts";

Bot.events.messageCreate = async (bot, interaction) => {
    if (interaction.isBot) {
        return;
    }
    log.info(
        `${interaction.member?.nick || "user"} said: ${interaction.content}`
    );
};
