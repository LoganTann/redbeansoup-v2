import { Message, Embed } from "discordeno";

export default interface IContext {
    replyText(text: string): Promise<Message | undefined>;
    replyEphemeralText(text: string): Promise<Message | undefined>;
    replyEmbed(embed: Embed, text?: string): Promise<Message | undefined>;
}
