import ICommand from "framework/types/ICommand.ts";
import Command from "framework/decorators/Command.ts";
import IContext from "framework/classes/Context/IContext.ts";

import env from "config";
import OpenAIClient from "../../utils/OpenAI/OpenAI.ts";
import { generateUsageChart } from "../../utils/OpenAI/OpenAiUtils.ts";
import { ApplicationCommandOptionTypes } from "discordeno";
import log from "../../../framework/logger.ts";

@Command
class Momo implements ICommand {
    name = "momo";
    description =
        "Momo answers all your requests, thanks to the OpenAI Beta API";
    group = "OpenAI";
    options = [
        {
            name: "input",
            description: "prompt to give",
            type: ApplicationCommandOptionTypes.String,
            required: true,
        },
    ];

    async run(ctx: IContext) {
        const client = new OpenAIClient(env.OPENAI_TOKEN);
        const inputString = ctx.getOption("input");
        if (!inputString) {
            ctx.replyEphemeralText("Error : Empty input.");
            return;
        }
        let outputPrefix = "... ";
        if (ctx.contextName === "interaction") {
            outputPrefix = `> ${inputString.replace("\n", "\n> ")}\n ...`;
            ctx.replyText(outputPrefix + " <a:loading:986003246776721478>");
        }
        // else todo : typing status + emoji reaction for message

        const completions = await client.fetchCompletion(inputString);
        let outputString = outputPrefix;
        outputString += completions.choices[0].text;
        outputString += "\n\n*See more with the command `$ai`*";

        log.info(`Momo ${inputString}: ${outputString}`);

        if (ctx.contextName === "interaction") {
            ctx.editReply(outputString);
            return;
        }
        ctx.replyText(outputString)
            .then(() => {
                log.info("Momo reply sent from message");
            })
            .catch((err) => {
                log.error(err);
            });
    }
}
