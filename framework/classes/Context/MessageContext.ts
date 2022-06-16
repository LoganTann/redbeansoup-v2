import { Message } from "../../../deps.ts";
import { BotClient } from "../../bot.ts";
import IContext from "./IContext.ts";

export default class MessageContext implements IContext {
    constructor(private bot: BotClient, private message: Message) {}

    async replyText(text: string): Promise<void> {
        await this.bot.helpers.sendTextMessage(this.message.channelId, text);
    }
}
