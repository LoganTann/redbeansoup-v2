import { Bot } from "../../framework/bot.ts";
import log from "../../framework/logger.ts";

// tmp
import Context from "../../framework/classes/Context.ts";

Bot.events.messageCreate = async (bot, interaction) => {
    if (interaction.isBot) {
        return;
    }

    if (Bot.commands.has(interaction.content)) {
        log.info("Command found", interaction.content);
        const ctx = new Context();
        Bot.commands.get(interaction.content)?.run(ctx);
    }
    log.info(
        `${interaction.member?.nick || "user"} said : ${interaction.content}`
    );
};
