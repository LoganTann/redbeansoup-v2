import app from "../app.ts";
import { jsonResponse } from "../utils.ts";
import DiscordUtils from "./_discord.ts";
const oauthRedirectUrl =
    "https://discord.com/api/oauth2/authorize?client_id=942097556371021924&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Flogin&response_type=code&scope=identify%20guilds";

app.get("/api/login", async (req) => {
    const { code } = req.query;
    if (!code) {
        return jsonResponse(400, { redirect: oauthRedirectUrl });
    }
    const result = await DiscordUtils.exchangeCode(code);
    // const request = await fetch("https://discord.com/api/users/@me", {
    //     headers: {
    //         authorization: `${tokenType} ${accessToken}`,
    //     },
    // });
    // const result = await request.json();
    return jsonResponse(200, result);
});
