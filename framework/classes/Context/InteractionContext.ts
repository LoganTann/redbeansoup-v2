import {
    DiscordMemberWithUser,
    Embed,
    Interaction,
    InteractionResponseTypes,
    Message,
} from "discordeno";
import { BotClient } from "framework/bot.ts";
import log from "framework/logger.ts";
import { getMember } from "framework/utils/getDiscordMember.ts";
import ICommand from "framework/types/ICommand.ts";
import IContext from "./IContext.ts";

export default class InteractionContext implements IContext {
    constructor(
        private bot: BotClient,
        private interaction: Interaction,
        private command: ICommand | null = null
    ) {}

    getOption(name: string | number): string | undefined {
        const options = this.interaction.data?.options || [];
        for (const i in options) {
            if (options[i].name === name || i === name) {
                // @ts-ignore TODO: fix typing
                return options[i].value;
            }
        }
    }

    getSenderNickname(): Promise<string> {
        return Promise.resolve(
            this.interaction.member?.nick || this.interaction.user.username
        );
    }
    getMember(userId: string | bigint): Promise<DiscordMemberWithUser> {
        return getMember(this.bot, this.interaction.guildId ?? 0n, userId);
    }

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
