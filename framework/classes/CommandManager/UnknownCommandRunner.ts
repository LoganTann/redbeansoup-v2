import {
    Interaction,
    InteractionResponseTypes,
    Message,
} from "../../../deps.ts";
import { BotClient } from "../../bot.ts";
import InteractionContext from "../Context/InteractionContext.ts";
import MessageContext from "../Context/MessageContext.ts";
import IRunner from "./IRunner.ts";

export default class UnknownCommandRunner implements IRunner {
    constructor(private commandName: string) {}

    async runFromInteraction(
        bot: BotClient,
        interaction: Interaction
    ): Promise<void> {
        new InteractionContext(bot, interaction).replyText(
            `Unknown command: ${this.commandName}`
        );
    }

    async runFromMessage(bot: BotClient, message: Message): Promise<void> {
        new MessageContext(bot, message).replyText(
            `Unknown command: ${this.commandName}`
        );
    }
}
