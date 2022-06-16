import { Bot, BotClient } from "../../framework/bot.ts";

Bot.events.messageCreate = async (bot, interaction) => {
    if (interaction.isBot) {
        return;
    }

    const commandName = interaction.content.split(" ")[0].replace("$", "");
    Bot.commands.ifExists(commandName).runFromMessage(Bot, interaction);
};
