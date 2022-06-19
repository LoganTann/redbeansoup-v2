import { Embed, Message, DiscordMemberWithUser } from "discordeno";
import { BotClient } from "framework/bot.ts";
import { getMember } from "framework/utils/getDiscordMember.ts";
import IContext from "./IContext.ts";

export default class MessageContext implements IContext {
    constructor(private bot: BotClient, private message: Message) {}
    getOption(name: string | number): string | undefined {
        return "NOT IMPLEMENTED";
    }
    getSenderNickname(): Promise<string> {
        return Promise.resolve(
            this.message.member?.nick ??
                `<unknown nickname of user ${this.message.authorId}>`
        );
    }
    getMember(userId: string | bigint): Promise<DiscordMemberWithUser> {
        return getMember(this.bot, this.message.guildId ?? 0n, userId);
    }

    replyText(text: string): Promise<Message | undefined> {
        return this.bot.helpers.sendTextMessage(this.message.channelId, text);
    }

    async replyEphemeralText(text: string): Promise<Message | undefined> {
        const message = await this.replyText(text);
        if (message) {
            await this.bot.helpers.deleteMessage(
                message.channelId,
                message.id,
                "ephemeral",
                3000
            );
        }
        return undefined;
    }

    replyEmbed(embed: Embed, text?: string): Promise<Message | undefined> {
        return this.bot.helpers.sendMessage(this.message.channelId, {
            content: text,
            embeds: [embed],
        });
    }
}
