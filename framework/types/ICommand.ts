import Context from "framework/classes/Context/IContext.ts";
import { CreateApplicationCommand } from "discordeno";

/**
 * Interface that defines a bot command
 */
export default interface ICommand extends CreateApplicationCommand {
    /*
        https://doc.deno.land/https://deno.land/x/discordeno@13.0.0-rc45/helpers/interactions/commands/createApplicationCommand.ts/~/CreateApplicationCommand
        Implicit :
            required : 
                name: string;
                description: string;
            recommanded :
                options?: ApplicationCommandOption[];
                type?: ApplicationCommandTypes;
                defaultMemberPermissions?: PermissionStrings[];
            optionnal : 
                descriptionLocalizations?: Localization;
                dmPermission?: boolean;
                nameLocalizations?: Localization;
    */

    run(ctx: Context): Promise<void>;

    devOnly?: boolean;
    group?: string;
}
