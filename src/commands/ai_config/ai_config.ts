import ICommand from "framework/types/ICommand.ts";
import Command from "framework/decorators/Command.ts";
import IContext from "framework/classes/Context/IContext.ts";

import env from "config";
import OpenAIClient from "../../utils/OpenAI/OpenAI.ts";
import { generateUsageChart } from "../../utils/OpenAI/OpenAiUtils.ts";
import { createDateWithMonthsRemoved } from "../../utils/datesManager.ts";

@Command
class Ai implements ICommand {
    name = "ai";
    description =
        "Configure OpenAI, and get the remaining amount of credits you have for your token.";
    group = "OpenAI";

    async run(ctx: IContext) {
        ctx.replyText("Loading usage...");
        const client = new OpenAIClient(env.OPENAI_TOKEN);

        const startDate = createDateWithMonthsRemoved(new Date(), 1);
        const endDate = new Date();

        const usage = await client.fetchUsage(startDate, endDate);
        const usageChart = generateUsageChart(startDate, endDate, usage);
        ctx.editReply(usageChart);
    }
}
