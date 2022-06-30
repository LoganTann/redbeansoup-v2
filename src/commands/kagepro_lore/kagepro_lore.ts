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
            let result = "**Liste des entrées de lore** :\n";
            result += list
                .map((elem) => `- \`/lore ${elem.name}\` : ${elem.title}`)
                .join("\n");
            return result;
        }
        const result = await loreRepo.getLore(name);
        if (!result) {
            return `No lore found for ${name}. Do \`/lore list\` to see all available lores.`;
        }
        return `**${result.title}**\n>>> ${result.description}`;
    }

    async run(ctx: IContext) {
        const name = ctx.getOption("name")?.toLowerCase() || "";
        const outputString = await this.getOutputString(name);
        ctx.replyText(outputString);
    }
}
