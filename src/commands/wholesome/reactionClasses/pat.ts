import ICommand from "framework/types/ICommand.ts";
import Command from "framework/decorators/Command.ts";
import IContext from "framework/classes/Context/IContext.ts";
import getImgUrl from "../getImgUrl.ts";
import { ApplicationCommandOptionTypes } from "discordeno";

@Command
export default class Pat implements ICommand {
    name = "pat";
    description = "let the bot pat someone !";

    group = "wholesome";

    options = [
        {
            name: "user",
            description: "user to pat",
            type: ApplicationCommandOptionTypes.User,
            required: false,
        },
        {
            name: "comment",
            description: "a kind comment to add",
            type: ApplicationCommandOptionTypes.String,
            required: false,
        },
    ];

    async run(ctx: IContext) {
        const title = "pat pat";
        const description = "pat someone";
        const imgUrl = await getImgUrl("pat");

        ctx.replyEmbed({
            title,
            description,
            color: 14825785,
            image: { url: imgUrl },
        });
    }
}
