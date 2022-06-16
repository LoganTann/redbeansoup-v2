import { Interaction, InteractionResponseTypes } from "../../../deps.ts";
import { BotClient } from "../../bot.ts";
import IContext from "./IContext.ts";

export default class InteractionContext implements IContext {
    constructor(private bot: BotClient, private interaction: Interaction) {}

    async replyText(text: string): Promise<void> {
        // warning : Does not support mentions
        await this.bot.helpers.sendInteractionResponse(
            this.interaction.id,
            this.interaction.token,
            {
                type: InteractionResponseTypes.ChannelMessageWithSource,
                data: {
                    content: text,
                },
            }
        );
    }
}
