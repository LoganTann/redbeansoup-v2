import ICommand from "framework/types/ICommand.ts";
import Command from "framework/decorators/Command.ts";
import IContext from "framework/classes/Context/IContext.ts";
import log from "framework/logger.ts";

import env from "config";
import { ApplicationCommandOptionTypes, Embed } from "discordeno";
import MeteoFranceClient from "../../utils/MeteoFrance/MeteoFrance.ts";
import MeteoHelpers from "../../utils/MeteoFrance/MeteoHelpers.ts";

@Command
class Meteo implements ICommand {
    name = "meteo";
    description = "Obtiens la météo de Paris";
    group = "Iut";

    async run(ctx: IContext) {
        const meteo = await MeteoFranceClient.getForecast();
        const out = MeteoHelpers.getForecastEmbedFields(meteo);
        const embedOut: Embed = {
            description: "Voici les prévisions météo du campus !",
            type: "rich",
            author: {
                name: "Descanicule pour Discord",
                iconUrl:
                    "https://cdn.discordapp.com/emojis/938158210114801774.webp",
            },
            fields: out,
            color: 14825785,
        };
        ctx.replyEmbed(embedOut);
    }
}
