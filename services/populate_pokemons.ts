// Script I runned once to fill my database
import { Pokemon } from '../models/pokemon.ts';
import { insertAbilities, insertPokemons, insertPokemonsAbilities } from '../repository/fixtures_utils.ts';
import { fetchData } from './api_pokemon.ts';

const main = async() => {
    const pokemonUrl = "/pokemon";
    const pokemonArtworkUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

    for (let i = 1; i <= 1000; i++) {
        let pokemon = await fetchData(pokemonUrl, `/${i.toString()}`, "");
        const pokemonName = pokemon.name.toString()[0].toUpperCase() + pokemon.name.slice(1);
        const pokemonHealth = pokemon.stats[0].base_stat;
        const pokemonAttack = pokemon.stats[1].base_stat;
        console.log(`populate_pokemon.main - ${i}- Parsing ${pokemonName}... Health: ${pokemonHealth}. Attack: ${pokemonAttack}`);
        pokemon = new Pokemon(i, pokemonName, pokemonHealth, pokemonAttack, undefined , `${pokemonArtworkUrl}${i}.png`);
        await insertPokemons(pokemon);
        await insertPokemonsAbilities(pokemon);
    }
}

main();