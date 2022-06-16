import { Collection } from "../../../deps.ts";
import ICommand from "../../types/ICommand.ts";

import ContextRunner from "./ContextRunner.ts";
import IRunner from "./IRunner.ts";
import UnknownCommandRunner from "./UnknownCommandRunner.ts";

/**
 * Stores the commands and their handlers.
 */
export default class CommandManager {
    constructor() {
        this.commandCollection = new Collection<string, ICommand>();
        this.commandGroups = {};
    }

    /**
     * Stores the commands that the bot has registered
     */
    private commandCollection: Collection<string, ICommand>;

    /**
     * Associate the group name with commands' names
     */
    private commandGroups: Record<string, string[]>;

    /**
     * Registers a command into the bot
     * @param commandToStore The command to register. Must be an instance implementing the ICommand interface.
     */
    registerCommand(commandToStore: ICommand) {
        // todo check if command haves a valid name
        const name = commandToStore.name;
        this.commandCollection.set(name, commandToStore);

        const group = commandToStore.group || "default";
        if (!Array.isArray(this.commandGroups[group])) {
            this.commandGroups[group] = [];
        }
        this.commandGroups[group].push(name);
    }

    /**
     * Checks if a command with the given name exists in the bot. If so, returns a runner to execute the command.
     * Otherwise, returns a runner to reply that the command does not exists.
     * @param commandName The name of the registered command
     * @returns a {@link ContextRunner} if the command exists, otherwise an {@link UnknownCommandRunner}
     */
    ifExists(commandName: string): IRunner {
        const command = this.commandCollection.get(commandName);
        if (command) {
            return new ContextRunner(command);
        }
        return new UnknownCommandRunner(commandName);
    }
}
