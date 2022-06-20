import {
    Embed,
    Message,
    DiscordMemberWithUser,
    deleteMessage,
    avatarURL,
    getUser,
} from "discordeno";
import { BotClient } from "framework/bot.ts";
import { getMember } from "framework/utils/getDiscordMember.ts";
import ICommand from "framework/types/ICommand.ts";
import IContext from "./IContext.ts";
import log from "framework/logger.ts";

export default class MessageContext implements IContext {
    constructor(
        private bot: BotClient,
        private message: Message,
        private command: ICommand | null = null
    ) {}
    public readonly contextName = "message";

    getOption(name: string | number): string | undefined {
        if (!this.command?.regexParser) {
            throw new Error(
                "No regex parser generated for this input: " +
                    this.message.content
            );
        }
        const matches = this.message.content.match(this.command.regexParser);
        if (!matches) {
            log.error(
                "No match found for regex parser: " +
                    this.command.regexParser +
                    " in message: " +
                    this.message.content
            );
            return undefined;
        }
        if (typeof name === "number") {
            return name < matches.length ? matches[name + 1] : undefined;
        }
        return matches.groups ? matches.groups[name] : undefined;
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

    async replyText(text: string): Promise<Message | undefined> {
        const messageRef = await this.sendMessage(text);
        this.sentMessage = messageRef;
        return messageRef;
    }

    async replyEphemeralText(text: string): Promise<Message | undefined> {
        const message = await this.replyText(text);
        if (!message) {
            return undefined;
        }
        await this.bot.helpers.deleteMessage(
            message.channelId,
            message.id,
            "ephemeral",
            3000
        );
    }

    async replyEmbed(
        embed: Embed,
        optionalText?: string
    ): Promise<Message | undefined> {
        const messageRef = await this.sendMessage(optionalText, [embed]);
        this.sentMessage = messageRef;
        return messageRef;
    }

    private sendMessage(
        content: string = "",
        embeds?: Embed[]
    ): Promise<Message | undefined> {
        return this.bot.helpers.sendMessage(this.message.channelId, {
            content,
            embeds,
            messageReference: {
                guildId: this.message.guildId,
                channelId: this.message.channelId,
                messageId: this.message.id,
                failIfNotExists: false,
            },
        });
    }

    private sentMessage?: Message;

    editReply(content: string, embeds?: Embed[]): Promise<Message | undefined> {
        if (!this.sentMessage) {
            throw new Error("No message sent before");
        }
        return this.bot.helpers.editMessage(
            this.sentMessage.channelId,
            this.sentMessage.id,
            {
                content,
                embeds,
            }
        );
    }

    async getSenderAvatarUrl(): Promise<string> {
        const member: DiscordMemberWithUser = await getMember(
            this.bot,
            this.message.guildId ?? 0n,
            this.message.authorId
        );
        if (member.user.avatar) {
            return `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.webp?size=100`;
        }
        return avatarURL(
            this.bot,
            this.message.authorId,
            member.user.discriminator
        );
    }

    deleteSourceMessage(reason: string): Promise<void> {
        return deleteMessage(
            this.bot,
            this.message.channelId,
            this.message.id,
            reason
        );
    }
}
