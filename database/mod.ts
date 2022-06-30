import LoreRepository from "./classes/loreRepository.ts";
import db from "./db.ts";

const loreRepo = new LoreRepository(db);

export { loreRepo };
