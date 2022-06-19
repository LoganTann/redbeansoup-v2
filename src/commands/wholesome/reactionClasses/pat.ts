import ICommand from "framework/types/ICommand.ts";
import Command from "framework/decorators/Command.ts";
import IContext from "framework/classes/Context/IContext.ts";
import getImgUrl from "../getImgUrl.ts";
import {
    ApplicationCommandOption,
    ApplicationCommandOptionTypes,
} from "discordeno";

@Command
export default class Pat implements ICommand {
    name = "pat";
    description = "let the bot pat someone !";

    group = "wholesome";

    options: ApplicationCommandOption[] = [
        {
            name: "user",
            description: "user to pat",
            type: ApplicationCommandOptionTypes.User,
            required: false,
        },
    ];

    async run(ctx: IContext) {
        const title = "pat pat";
        let description;
        const imgUrl = await getImgUrl("pat");

        const userID = ctx.getOption("user") ?? ctx.getOption(0);
        if (userID) {
            const target = await ctx.getMember(userID);
            const targetNick = target.nick || target.user.username;
            const senderNick = await ctx.getSenderNickname();
            description = `${senderNick} pats ${targetNick}`;
        }

        ctx.replyEmbed({
            title,
            description,
            color: 14825785,
            image: { url: imgUrl },
        });
    }
}
