import { Message, Embed, DiscordMemberWithUser } from "discordeno";

export default interface IContext {
    contextName: "interaction" | "message";

    // input
    getOption(name: string | number): string | undefined;

    // output
    replyText(text: string): Promise<Message | undefined>;
    replyEphemeralText(text: string): Promise<Message | undefined>;
    replyEmbed(embed: Embed, text?: string): Promise<Message | undefined>;
    editReply(text: string, embeds?: Embed[]): Promise<Message | undefined>;

    // utils
    getSenderAvatarUrl(): Promise<string>;
    getSenderNickname(): Promise<string>;
    getMember(userId: string | bigint): Promise<DiscordMemberWithUser>;
    getLast100Messages(): Promise<Message[]>;

    // actions
    deleteSourceMessage(reason: string): Promise<void>;
    deleteMessages(ids: BigInt[], reason: string): Promise<void>;
}
