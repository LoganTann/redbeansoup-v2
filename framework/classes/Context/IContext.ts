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
    getSenderNickname(): Promise<string>;
    getMember(userId: string | bigint): Promise<DiscordMemberWithUser>;
}
