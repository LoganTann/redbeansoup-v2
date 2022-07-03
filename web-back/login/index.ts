import app from "../app.ts";
import { jsonResponse } from "../utils.ts";
import DiscordUtils from "./_discord.ts";
const oauthRedirectUrl =
    "https://discord.com/api/oauth2/authorize?client_id=942097556371021924&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Flogin&response_type=code&scope=identify%20guilds";

import Session from "../sessions.ts";

app.get("/api/login", async (req) => {
    const session: Session = new Session(req);
    const { code } = req.query;
    if (!code) {
        return jsonResponse(400, { redirect: oauthRedirectUrl });
    }
    const tokenResult = await DiscordUtils.exchangeCode(code);
    session.set("connected", "ok");
    const request = await fetch("https://discord.com/api/users/@me", {
        headers: {
            authorization: `${tokenResult.token_type} ${tokenResult.access_token}`,
        },
    });
    const result = await request.json();
    return jsonResponse(200, result);
});

app.get("/api/login/sessionStatus", (req) => {
    const session: Session = new Session(req);
    const connected = session.get("connected");
    const id = session.id;
    return jsonResponse(200, { id, connected });
});
