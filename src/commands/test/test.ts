import ICommand from "framework/types/ICommand.ts";
import Command from "framework/decorators/Command.ts";
import IContext from "framework/classes/Context/IContext.ts";
import {
    ApplicationCommandOption,
    ApplicationCommandOptionTypes,
} from "discordeno";

@Command
export default class Test implements ICommand {
    name = "test";
    description = "testing commmand";
    group = "dev";

    options: ApplicationCommandOption[] = [
        {
            name: "int",
            description: "an integer",
            type: ApplicationCommandOptionTypes.Integer,
            required: true,
        },
        {
            name: "string",
            description: "a string",
            type: ApplicationCommandOptionTypes.String,
            required: true,
        },
        {
            name: "secstring",
            description: "Second string",
            type: ApplicationCommandOptionTypes.String,
            required: true,
        },
        {
            name: "user",
            description: "user to pat",
            type: ApplicationCommandOptionTypes.User,
            required: true,
        },
    ];

    async run(ctx: IContext) {
        const int = ctx.getOption("int");
        const string = ctx.getOption("string");
        const user = ctx.getOption("user");
        const secstring = ctx.getOption("secstring");
        ctx.replyText(
            `int: ${int}, string: ${string}, user: ${user}, secstring: ${secstring}`
        );
    }
}
