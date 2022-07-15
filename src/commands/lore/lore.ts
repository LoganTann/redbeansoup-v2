import ICommand from "framework/types/ICommand.ts";
import Command from "framework/decorators/Command.ts";
import IContext from "framework/classes/Context/IContext.ts";
import {
    ApplicationCommandOption,
    ApplicationCommandOptionTypes,
} from "discordeno";
import { loreRepo } from "db";

@Command
export default class Lore implements ICommand {
    name = "lore";
    description = "Get the lore of something";
    group = "kagepro";

    options: ApplicationCommandOption[] = [
        {
            name: "name",
            description:
                "The name of the entry you are looking for. Type list to see the list.",
            type: ApplicationCommandOptionTypes.String,
            required: true,
        },
    ];

    async getOutputString(name: string): Promise<string> {
        if (name === "list") {
            const list = await loreRepo.list();
            const result = "**Liste des entrées de lore** :\n";
            return list.length !== 0 ?
                result + list
                    .map((elem) => `- \`/lore ${elem.name}\` : ${elem.title}`)
                    .join("\n")
                :
                    "**Aucun lore existant**" // Maybe find a better text
                ;
        }
        const result = await loreRepo.getLore(name);
        if (!result) {
            return `No lore found for ${name}. Do \`/lore list\` to see all available lores.`; // Français or English?
        }

        return JSON.stringify( {
            embeds: [
                {
                    title: result.title,
                    description: result.description,
                    color : result.color ? result.color : "#fff",
                    image : result.image ? {url : result.image} : {},
                    thumbnail : result.thumb ? {url : result.thumb} : {},
                }
            ]
        })
    }

    async run(ctx: IContext) {
        const name = ctx.getOption("name")?.toLowerCase() || "";
        const outputString = await this.getOutputString(name);
        ctx.replyText(outputString);
    }
}
