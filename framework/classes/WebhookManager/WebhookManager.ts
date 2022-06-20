import { BotClient } from "../../bot.ts";
import {
    Collection,
    ExecuteWebhook,
    Message,
    Webhook,
    createWebhook,
    sendWebhook,
    getChannelWebhooks,
} from "discordeno";

export default class WebhookManager {
    readonly WEBHOOK_NAME = "redbeansoup-reaction";
    private channelId: bigint;

    constructor(private bot: BotClient, messageInTargetChannel: Message) {
        this.channelId = messageInTargetChannel.channelId;
    }

    createWebhook(): Promise<Webhook> {
        return createWebhook(this.bot, this.channelId, {
            name: this.WEBHOOK_NAME,
            avatar: "https://soup.kagescan.fr/assets/redbeansoup.webp",
        });
    }

    async getWebhook() {
        const channelWebhooks: Collection<bigint, Webhook> =
            await getChannelWebhooks(this.bot, this.channelId);
        for (const [_id, webhook] of channelWebhooks) {
            if (webhook.name === this.WEBHOOK_NAME) {
                return webhook;
            }
        }
        // at this point, it does not exists
        return await this.createWebhook();
    }

    async sendWebhook(options: ExecuteWebhook): Promise<Message | undefined> {
        const webhook = await this.getWebhook();
        if (!webhook.token) {
            return undefined;
        }
        return sendWebhook(this.bot, webhook.id, webhook.token, options);
    }
}
