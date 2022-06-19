import { Embed, Message, DiscordMemberWithUser } from "discordeno";
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
