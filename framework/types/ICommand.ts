import Context from "../classes/Context.ts";

/**
 * Interface that defines a bot command
 */
export default interface ICommand {
    name: string;
    description: string;
    run(ctx: Context): Promise<void>;

    devOnly?: boolean;
    group?: string;
}
