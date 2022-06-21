import ICommand from "framework/types/ICommand.ts";
import IContext from "framework/classes/Context/IContext.ts";
import getImgUrl from "./getImgUrl.ts";
import {
    ApplicationCommandOption,
    ApplicationCommandOptionTypes,
} from "discordeno";
import IWholesomeInfo from "./IWholesomeInfo.ts";

export default function reactionFactory(wholesomeInfo: IWholesomeInfo) {
    const wholesomeOptions: ApplicationCommandOption[] = [];
    if (wholesomeInfo.targetedUser) {
        wholesomeOptions.push({
            name: "user",
            description: wholesomeInfo.targetedUser.argDescription,
            type: ApplicationCommandOptionTypes.User,
            required: false,
        });
    }

    return class implements ICommand {
        name = wholesomeInfo.name;
        description = wholesomeInfo.description;
        group = "kagepro";
        options: ApplicationCommandOption[] = wholesomeOptions;

        private async getTitle(ctx: IContext) {
            const userID = ctx.getOption("user");
            const senderNick = await ctx.getSenderNickname();
            if (wholesomeInfo.targetedUser === undefined || !userID) {
                return wholesomeInfo.singleTitle.replace(
                    "{sender}",
                    senderNick
                );
            }
            const target = await ctx.getMember(userID);
            const targetNick = target.nick || target.user.username;
            return wholesomeInfo.targetedUser.replyDescription
                .replace("{sender}", senderNick)
                .replace("{target}", targetNick);
        }

        async run(ctx: IContext) {
            const imgUrl = await getImgUrl(
                wholesomeInfo.apiName ?? wholesomeInfo.name
            );
            ctx.replyEmbed({
                title: await this.getTitle(ctx),
                color: 14825785,
                image: { url: imgUrl },
            });
        }
    };
}
