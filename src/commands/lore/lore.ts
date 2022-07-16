import ICommand from "framework/types/ICommand.ts";
import Command from "framework/decorators/Command.ts";
import IContext from "framework/classes/Context/IContext.ts";

import {
    ApplicationCommandOption,
    ApplicationCommandOptionTypes,
    Embed,
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

    /**
     * Method that return the output with the type of output (embedded or text) and the result
     * @param {string} name The name of the entry you are looking for.
     * @returns {{type: string, result: string | Embed}} The output with the type of output (embedded or text) and the result
     */
    async getOutput(name: string): Promise<{type: string, result: string | Embed}> {
        if (name === "list") {
            const list = await loreRepo.list();
            const toReturn = {
                type: "text",
                result: "**Liste des entrées de lore** :\n"
            }
            list.length !== 0 ? toReturn.result += list
                .map((elem) => `- \`/lore ${elem.name}\` : ${elem.title}`)
                .join("\n")
                : toReturn.result = "Aucune entrée de lore n'a été trouvée.";
            return toReturn;
        }
        const result = await loreRepo.getLore(name);
        if (!result) {
            return {
                type: "text",
                result: `No lore found for ${name}. Do \`/lore list\` to see all available lores.` // Français or English?
            }
        }
        const embed: Embed = {
            title: result.title as string,
            description: result.description as string,
            color: result.color ? result.color as number: 1146986,
            thumbnail: result.thumb ? {url : result.thumb as string} : undefined,
            image: result.image ? {url : result.image as string} : undefined,
        };
        return {
            type: "embed",
            result: embed,
        }
    }

    async run(ctx: IContext) {
        const name = ctx.getOption("name")?.toLowerCase() || "";
        const output = await this.getOutput(name);
        return output.type === "text" ? ctx.replyText(output.result as string) : ctx.replyEmbed(output.result as Embed);
    }
}
