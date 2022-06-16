import { Bot } from "framework/bot.ts";
import { InteractionTypes } from "discordeno";

Bot.events.interactionCreate = (_bot, interaction) => {
    if (!interaction.data) return;

    switch (interaction.type) {
        case InteractionTypes.ApplicationCommand:
            Bot.commands
                .ifExists(interaction.data.name)
                .runFromInteraction(Bot, interaction);
            break;
    }
};
