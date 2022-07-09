import app from "../app.ts";
import { jsonResponse } from "../utils.ts";
import DiscordUtils, { tokenFromCode } from "./_discord.ts";
const oauthRedirectUrl =
    "https://discord.com/api/oauth2/authorize?client_id=942097556371021924&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Flogin&response_type=code&scope=identify%20guilds";

import Session from "../sessions.ts";

app.get("/api/login", async (req) => {
    try {
        const session: Session = new Session(req);
        const { code } = req.query;
        if (!code) {
            return { redirect: oauthRedirectUrl };
        }
        const tokenResult = await DiscordUtils.exchangeCode(code);
        saveDiscordTokenInSession(session, tokenResult);
        return { redirect: "/index.html" };
    } catch (e) {
        return jsonResponse(500, { error: "" + e });
    }
});

function saveDiscordTokenInSession(
    session: Session,
    tokenResult: tokenFromCode
) {
    const authorization = `${tokenResult.token_type} ${tokenResult.access_token}`;
    const expiration = new Date(Date.now() + tokenResult.expires_in * 1000);
    session.set("discord_authorization", authorization);
    session.set("discord_expiration", expiration.toISOString());
}

app.get("/api/login/userInfo", async (req) => {
    try {
        const session: Session = new Session(req);
        const token = session.get("discord_authorization");
        if (!token) {
            return jsonResponse(401, { redirect: oauthRedirectUrl });
        }
        const discord = new DiscordUtils(token);
        const response = await discord.fetchUser();
        return jsonResponse(200, response);
    } catch (e) {
        return jsonResponse(500, { error: e });
    }
});
