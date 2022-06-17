import {
    Embed,
    Interaction,
    InteractionResponseTypes,
    Message,
} from "discordeno";
import { BotClient } from "framework/bot.ts";
import IContext from "./IContext.ts";

export default class InteractionContext implements IContext {
    constructor(private bot: BotClient, private interaction: Interaction) {}

    replyText(text: string): Promise<Message | undefined> {
        return this.sendInteractionResponse(text);
    }

    replyEphemeralText(text: string): Promise<Message | undefined> {
        return this.sendInteractionResponse(text, undefined, 64);
    }

    replyEmbed(embed: Embed, text?: string): Promise<Message | undefined> {
        return this.sendInteractionResponse(text, [embed]);
    }

    private sendInteractionResponse(
        content?: string,
        embeds?: Array<Embed>,
        flags?: number
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
                    embeds,
                },
            }
        );
    }
}
