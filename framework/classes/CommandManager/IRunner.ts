import { Message, Interaction } from "../../../deps.ts";
import { BotClient } from "../../bot.ts";

export default interface IRunner {
    runFromInteraction(bot: BotClient, interaction: Interaction): Promise<void>;
    runFromMessage(bot: BotClient, message: Message): Promise<void>;
}
