import { createApp } from "https://unpkg.com/vue@3.2.37/dist/vue.esm-browser.js";

createApp({
    data() {
        return {
            /** @type {null | {avatar: string, id: string, username: string, discriminator: string}} */
            userInfo: null,
            discordRedirectUrl: "#",
        };
    },
    async created() {
        await this.getUserInfo();
    },
    methods: {
        redirectToDiscordUrl() {
            if (this.discordRedirectUrl) {
                window.location = this.discordRedirectUrl;
            }
        },
        async getUserInfo() {
            const request = await fetch("/api/login/userInfo");
            const response = await request.json();
            if (response.redirect) {
                this.discordRedirectUrl = response.redirect;
                return;
            }
            this.userInfo = response;
        },
    },
    computed: {
        title() {
            if (this.userInfo) {
                return `Welcome, ${this.userInfo.username}`;
            }
            return "Redbeansoup-bot dashboard";
        },
    },
}).mount("#app");
