import ICommand from "framework/types/ICommand.ts";
import Command from "framework/decorators/Command.ts";
import IContext from "framework/classes/Context/IContext.ts";

import env from "config";
import OpenAIClient from "../../utils/OpenAI/OpenAI.ts";
import { generateUsageChart } from "../../utils/OpenAI/OpenAiUtils.ts";

@Command
class Ai implements ICommand {
    name = "ai";
    description =
        "Configure OpenAI, and get the remaining amount of credits you have for your token.";
    group = "OpenAI";

    async run(ctx: IContext) {
        ctx.replyText("Loading usage...");
        const client = new OpenAIClient(env.OPENAI_TOKEN);
        const usage = await client.fetchUsage();
        const usageChart = generateUsageChart(usage);
        ctx.editReply(usageChart);
    }
}
