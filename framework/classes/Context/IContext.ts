import { Message } from "discordeno";

export default interface IContext {
    replyText(text: string): Promise<Message | undefined>;
    replyEphemeralText(text: string): Promise<Message | undefined>;
}
