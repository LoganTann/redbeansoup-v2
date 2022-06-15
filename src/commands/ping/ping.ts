import ICommand from "../../../framework/types/ICommand.ts";
import Command from "../../../framework/decorators/Command.ts";
import Context from "../../../framework/classes/Context.ts";

@Command
class Ping implements ICommand {
    name = "ping";
    description = "let the bot reply pong !";

    async run(ctx: Context) {
        ctx.reply("pong");
    }
}
