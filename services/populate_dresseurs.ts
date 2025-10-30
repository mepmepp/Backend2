import { Dresseur } from "../models/dresseur.ts";
import { Pokemon } from "../models/pokemon.ts";
import { pickPokemon } from "../repository/db_utils.ts";
import { isPokemon } from "../globals/functions.ts";



const main = async() => {
    const Jacques = await createDresseur("Jacques");
    const Clementine = await createDresseur("Clémentine");

}

const createDresseur = async(name: string) => {
    const dresseur = new Dresseur(name);

    const pokemon1 = await pickPokemon(Math.floor(Math.random() * 999 + 1));
    const pokemon2 = await pickPokemon(Math.floor(Math.random() * 999 + 1));
    const pokemon3 = await pickPokemon(Math.floor(Math.random() * 999 + 1));
    const pokemon4 = await pickPokemon(Math.floor(Math.random() * 999 + 1));
    const pokemon5 = await pickPokemon(Math.floor(Math.random() * 999 + 1));
    const pokemon6 = await pickPokemon(Math.floor(Math.random() * 999 + 1));
    const pokemon7 = await pickPokemon(Math.floor(Math.random() * 999 + 1));
    const pokemon8 = await pickPokemon(Math.floor(Math.random() * 999 + 1));

    const pokemonList = [pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6, pokemon7, pokemon8];
    
    for (let i = 0; i <= pokemonList.length - 1; i++) {
        if (isPokemon(pokemonList[i])) dresseur.addPokemon(pokemonList[i]);
    }

    return dresseur;
}

main();