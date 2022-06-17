import { Interaction, InteractionResponseTypes, Message } from "discordeno";
import { BotClient } from "framework/bot.ts";
import IContext from "./IContext.ts";

export default class InteractionContext implements IContext {
    constructor(private bot: BotClient, private interaction: Interaction) {}

    replyText(text: string): Promise<Message | undefined> {
        return this.sendInteractionResponse(text, undefined);
    }

    replyEphemeralText(text: string): Promise<Message | undefined> {
        return this.sendInteractionResponse(text, 64);
    }

    private sendInteractionResponse(
        content: string,
        flags: number | undefined
    ): Promise<Message | undefined> {
        // warning : Does not support mentions
        return this.bot.helpers.sendInteractionResponse(
            this.interaction.id,
            this.interaction.token,
            {
                type: InteractionResponseTypes.ChannelMessageWithSource,
                data: {
                    content,
                    flags,
                },
            }
        );
    }
}
