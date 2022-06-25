import client from "./db.ts";
import LoreRepository from "./classes/LoreRepository.ts";

export const loreRepo = new LoreRepository(client);
