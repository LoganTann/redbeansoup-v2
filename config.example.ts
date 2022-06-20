/**
 * This holds the bot's configuration.
 * The file config.ts SHOULD BE KEPT SECRET.
 */

export default {
    // Discord Developers -> Oauth2 -> Client ID
    CLIENT_ID: "",
    // Discord Developers -> Bot -> reset
    BOT_TOKEN: "",
    // Right Click on your dev server icon -> Copy ID
    DEV_GUILD_ID: "",
    // Get your OpenAI token in your dashboard - https://openai.com/api/
    OPENAI_TOKEN: "",

    // default password defined in docker-compose. Make sure you change it.
    MYSQL_ROOT_PASSWORD: "redbeansoup-bot",
    MYSQL_DATABASE: "redbeansoup",

    // Kagescan API
    WHOLESOME_ENDPOINT:
        "https://kagescan.legtux.org/api/pic.php?noRedirect=true&i=",
};
