import { Message, Interaction } from "discordeno";
import { BotClient } from "framework/bot.ts";

export default interface IRunner {
    runFromInteraction(bot: BotClient, interaction: Interaction): Promise<void>;
    runFromMessage(bot: BotClient, message: Message): Promise<void>;
}
