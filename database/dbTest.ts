import client from "./db.ts";

import LoreRepository from "./classes/loreRepository.ts";

const lore = new LoreRepository(client);

console.log(
    await lore.createLore(
        "poisson",
        "ENE Poisson",
        "C'est ene avec une bouche de magicarpe. Cursed."
    )
);

console.log(await lore.readLore("poisson"));
