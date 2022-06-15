import { Bot } from "../bot.ts";

import ICommand from "../types/ICommand.ts";

/**
 * Command decorator : register the class as a command into the bot
 * Requires the class to implement the ICommand interface
 */
export default function Command<
    T extends { new (...args: unknown[]): ICommand }
>(target: T): void {
    const commandClass: ICommand = new target();

    const commandName = commandClass.name;
    Bot.commands.set(commandName, commandClass);

    const commandGroup = commandClass.group || "default";
    if (!Array.isArray(Bot.cmdGroup[commandGroup])) {
        Bot.cmdGroup[commandGroup] = [];
    }
    Bot.cmdGroup[commandGroup].push(commandName);
}
