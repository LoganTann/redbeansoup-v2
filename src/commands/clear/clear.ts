import ICommand from "framework/types/ICommand.ts";
import Command from "framework/decorators/Command.ts";
import IContext from "framework/classes/Context/IContext.ts";
import {
    ApplicationCommandOption,
    ApplicationCommandOptionTypes,
    deleteMessages,
    Message,
} from "discordeno";

@Command
export default class Clear implements ICommand {
    name = "clear";
    description = "Delete multiple messages in one command";

    options: ApplicationCommandOption[] = [
        {
            name: "n",
            description:
                "The number of messages you want to delete, or a message ID",
            type: ApplicationCommandOptionTypes.String,
            required: true,
        },
    ];

    async run(ctx: IContext) {
        try {
            const response = await this.handleClear(ctx);
            await ctx.replyEphemeralText(response);
        } catch (e) {
            await ctx.replyEphemeralText(e.toString());
        }
    }

    async handleClear(ctx: IContext): Promise<string> {
        const n = this.get_n(ctx);
        const messagesList = await this.getMessageList(ctx);
        const toRemove: bigint[] = [];
        if (n > 0 && n < 100) {
            this.fill_n_messages(toRemove, messagesList, n);
        } else {
            this.fillUntilIdMatch(toRemove, messagesList, n);
        }
        const outputMessage = this.validateToRemove(toRemove);
        await ctx.deleteMessages(toRemove, `Redbeansoup/clear ${n}`);
        return outputMessage;
    }

    get_n(ctx: IContext): bigint {
        let n: string | bigint | undefined = ctx.getOption("n");
        try {
            return BigInt(typeof n === "string" ? n : "throw");
        } catch (e) {}
        throw new Error(
            "Incorrect input. Do `/clear <nb>` or `/clear <messageId>`."
        );
    }

    async getMessageList(ctx: IContext) {
        const messagesList: Array<Message> = await ctx.getLast100Messages();
        if (messagesList.length > 1) {
            return messagesList;
        }
        throw new Error("Not enough messages in the channel. Clear manually.");
    }

    fill_n_messages(toRemove: bigint[], messagesList: Message[], n: bigint) {
        // TODO : -1 in interaction.
        for (let i = 0; i < messagesList.length; i++) {
            if (i > n) return;
            toRemove.push(messagesList[i].id);
        }
    }

    fillUntilIdMatch(toRemove: bigint[], messages: Message[], n: bigint) {
        for (let i = 0; i < messages.length; i++) {
            toRemove.push(messages[i].id);
            if (messages[i].id === n) return;
        }
        throw new Error("Wrong message id");
    }

    validateToRemove(toRemove: bigint[]): string {
        if (toRemove.length <= 0) {
            throw new Error("Wrong input.");
        }
        return `Cleared ${toRemove.length - 1} messages`;
    }
}
