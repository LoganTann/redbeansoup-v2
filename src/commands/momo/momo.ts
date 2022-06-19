import ICommand from "framework/types/ICommand.ts";
import Command from "framework/decorators/Command.ts";
import IContext from "framework/classes/Context/IContext.ts";

import env from "config";
import OpenAIClient from "../../utils/OpenAI/OpenAI.ts";
import { generateUsageChart } from "../../utils/OpenAI/OpenAiUtils.ts";

@Command
class Momo implements ICommand {
    name = "momo";
    description =
        "Momo réponds à toutes vos demandes, grâce à l'API Beta d'OpenAI";

    async run(ctx: IContext) {
        const client = new OpenAIClient(env.OPENAI_TOKEN);
        const usage = await client.fetchUsage();
        const usageChart = generateUsageChart(usage);
        ctx.replyText(usageChart);
    }
}
