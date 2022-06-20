import { Bot, Embed, Message } from "discordeno";
import MessageContext from "framework/classes/Context/MessageContext.ts";
import { BotClient } from "framework/bot.ts";
import stickersList from "./stickersList.ts";
import IContext from "framework/classes/Context/IContext.ts";
import WebhookManager from "../../../../framework/classes/WebhookManager/WebhookManager.ts";

export default async function stickers(bot: BotClient, message: Message) {
    const stickerID = message.content.trim().toLowerCase();
    if (typeof stickersList[stickerID] !== "string") {
        return;
    }

    const ctx: IContext = new MessageContext(bot, message);
    const username = await ctx.getSenderNickname();
    const avatarUrl = await ctx.getSenderAvatarUrl();
    const embed: Embed = {
        description: `${username} reacted *${stickerID}*`,
        image: { url: stickersList[stickerID] },
    };

    await new WebhookManager(bot, message).sendWebhook({
        content: "",
        avatarUrl,
        username,
        embeds: [embed],
    });
    await ctx.deleteSourceMessage("Reacted with a sticker");
}
