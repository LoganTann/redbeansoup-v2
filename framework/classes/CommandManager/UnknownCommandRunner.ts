import { Interaction, Message } from "discordeno";
import { BotClient } from "framework/bot.ts";
import InteractionContext from "framework/classes/Context/InteractionContext.ts";
import MessageContext from "framework/classes/Context/MessageContext.ts";
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
        new MessageContext(bot, message).replyEphemeralText(
            `Unknown command: ${this.commandName}`
        );
    }
}
