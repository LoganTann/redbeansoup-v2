import { DiscordMemberWithUser, Bot } from "discordeno";

export async function getMember(
    bot: Bot,
    guildId: bigint,
    userId: string | bigint
): Promise<DiscordMemberWithUser> {
    if (typeof userId === "string") {
        userId = BigInt(userId);
    }
    return await bot.rest.runMethod<DiscordMemberWithUser>(
        bot.rest,
        "GET",
        bot.constants.routes.GUILD_MEMBER(guildId, userId)
    );
}
