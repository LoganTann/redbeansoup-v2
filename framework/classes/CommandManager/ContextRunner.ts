import { Interaction, Message } from "discordeno";
import { BotClient } from "framework/bot.ts";
import ICommand from "framework/types/ICommand.ts";
import IContext from "framework/classes/Context/IContext.ts";
import InteractionContext from "framework/classes/Context/InteractionContext.ts";
import MessageContext from "framework/classes/Context/MessageContext.ts";
import IRunner from "./IRunner.ts";

export default class ContextRunner implements IRunner {
    constructor(private command: ICommand) {}

    runFromInteraction(
        bot: BotClient,
        interaction: Interaction
    ): Promise<void> {
        const context: IContext = new InteractionContext(
            bot,
            interaction,
            this.command
        );
        return this.command.run(context);
    }
    runFromMessage(bot: BotClient, message: Message): Promise<void> {
        const context: IContext = new MessageContext(
            bot,
            message,
            this.command
        );
        return this.command.run(context);
    }
}
