import { randomChallenge } from "../controller/random_challenge.ts";
import { verifyUnicity, verifyUnicityInNumberLists } from "../globals/functions.ts";
import { pokExemple } from "../models/pokemon.ts";
import { getDresseurPokemonsId, pickPokemon } from "../repository/db_utils.ts";
import { insertPokemonsAbilities } from "../repository/fixtures_utils.ts";

// pickPokemon(10);

// insertPokemonsAbilities(pokExemple);

// for (let i = 1; i <= 200; i++) {
//     let abilitiesId = [Math.floor(Math.random() * 40), Math.floor(Math.random() * 40), Math.floor(Math.random() * 40)];
//     console.log(abilitiesId);
// }

// for (let i = 1; i <= 50; i++) {
//     let abilitiesId;
//     while (true) {
//         abilitiesId = [Math.floor(Math.random() * 40), Math.floor(Math.random() * 40), Math.floor(Math.random() * 40)];
//         if (verifyUnicityInNumberLists(abilitiesId) && verifyUnicity(0, abilitiesId)) break;
//         console.log('It failed!')
//     }
// }

console.log(Math.random());