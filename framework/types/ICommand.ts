import Context from "framework/classes/Context/IContext.ts";

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
