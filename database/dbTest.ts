import GuildRepository from "./classes/guildRepository.ts";
import LoreRepository from "./classes/loreRepository.ts";
import db from "./db.ts";
import log from "framework/logger.ts";

const guildId = "123456789012345678";
const guildRepo = new GuildRepository(db);
const loreRepo = new LoreRepository(db);

await guildRepo.getGuildOrRegisterIt(BigInt(guildId));
await loreRepo.createLore(
    guildId,
    "redbeansoup",
    "L'emoticone Rrdbeansoup proviens d'un extrait de l'anthology comic *For the Sake of our future*, montrant le personnage Momo Kisaragi buvant un soda à la soupe aux haricots rouges."
);
const result = await loreRepo.getLore(guildId, "poisson");

log.info("Result for poisson:", result);
