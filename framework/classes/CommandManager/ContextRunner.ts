import { Interaction, Message } from "../../../deps.ts";
import { BotClient } from "../../bot.ts";
import ICommand from "../../types/ICommand.ts";
import IContext from "../Context/IContext.ts";
import InteractionContext from "../Context/InteractionContext.ts";
import MessageContext from "../Context/MessageContext.ts";
import IRunner from "./IRunner.ts";

export default class ContextRunner implements IRunner {
    constructor(private command: ICommand) {}

    runFromInteraction(
        bot: BotClient,
        interaction: Interaction
    ): Promise<void> {
        const context: IContext = new InteractionContext(bot, interaction);
        return this.command.run(context);
    }
    runFromMessage(bot: BotClient, message: Message): Promise<void> {
        const context: IContext = new MessageContext(bot, message);
        return this.command.run(context);
    }
}
