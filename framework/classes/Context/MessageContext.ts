import { Message } from "discordeno";
import { BotClient } from "framework/bot.ts";
import IContext from "./IContext.ts";

export default class MessageContext implements IContext {
    constructor(private bot: BotClient, private message: Message) {}

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
}
