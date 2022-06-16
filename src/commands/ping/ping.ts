import ICommand from "../../../framework/types/ICommand.ts";
import Command from "../../../framework/decorators/Command.ts";
import Context from "../../../framework/classes/Context/IContext.ts";

@Command
class Ping implements ICommand {
    name = "ping";
    description = "let the bot reply pong !";

    async run(ctx: Context) {
        ctx.replyText("pong");
    }
}
