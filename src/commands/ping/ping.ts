import ICommand from "framework/types/ICommand.ts";
import Command from "framework/decorators/Command.ts";
import IContext from "framework/classes/Context/IContext.ts";

@Command
class Ping implements ICommand {
    name = "ping";
    description = "let the bot reply pong !";

    async run(ctx: IContext) {
        ctx.replyText("pong");
    }
}
