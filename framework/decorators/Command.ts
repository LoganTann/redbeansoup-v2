import { Bot } from "framework/bot.ts";

import ICommand from "framework/types/ICommand.ts";

/**
 * Command decorator : register the class as a command into the bot
 * Requires the class to implement the ICommand interface
 */
export default function Command<
    T extends { new (...args: unknown[]): ICommand }
>(target: T): void {
    const commandClass: ICommand = new target();
    Bot.commands.registerCommand(commandClass);
}
