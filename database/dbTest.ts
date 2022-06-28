import GuildRepository from "./classes/guildRepository.ts";
import LoreRepository from "./classes/loreRepository.ts";
import db from "./db.ts";
import log from "framework/logger.ts";

const loreRepo = new LoreRepository(db);

await loreRepo.createLore(
    "poisson",
    "Ene avec une bouche de magicarpe. Cursed."
);
const result = await loreRepo.getLore("poisson");

log.info("Result for poisson:", result);
