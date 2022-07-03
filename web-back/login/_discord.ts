import env from "config";

interface tokenFromCode {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
}

export default class DiscordUtils {
    public static readonly oauthRedirectUrl =
        "https://discord.com/api/oauth2/authorize?client_id=942097556371021924&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Flogin&response_type=code&scope=identify%20guilds";
    public static readonly redirectUri = "http://localhost:3000/api/login";
    public static readonly API_ENDPOINT = "https://discord.com/api/v10";

    static async exchangeCode(code: string): Promise<tokenFromCode> {
        const data = {
            client_id: env.CLIENT_ID,
            client_secret: env.CLIENT_SECRET,
            grant_type: "authorization_code",
            code: code,
            redirect_uri: DiscordUtils.redirectUri,
        };
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded",
        };
        const request = await fetch(
            DiscordUtils.API_ENDPOINT.concat("/oauth2/token"),
            {
                headers: headers,
                method: "POST",
                body: new URLSearchParams(data).toString(),
            }
        );
        return await request.json();
    }
}
