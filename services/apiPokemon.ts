// Script I runned once to fill my database
import { Pokemon } from '../models/pokemon.ts';

const baseUrl = "https://pokeapi.co/api/v2";
const options = {
    method : "GET"
}
const pokemonUrl = "/pokemon";

const main = async() => {
    const pokemons: Pokemon[] = []; 

    for (let i = 1; i <= 1000; i++) {
        let pokemon = await fetchData(pokemonUrl, `/${i.toString()}`, "");
        const pokemonName = pokemon.name.toString()[0].toUpperCase() + pokemon.name.slice(1);
        const pokemonHealth = pokemon.stats[0].base_stat;
        const pokemonAttack = pokemon.stats[1].base_stat;
        console.log(`apiPokemon - ${i}- Parsing ${pokemonName}... Health: ${pokemonHealth}. Attack: ${pokemonAttack}`);
        pokemons.push(new Pokemon(pokemonName, pokemonHealth, pokemonAttack));
    }

    

}

const fetchData = async(url: string, id: string, limit: string) => {
    // console.log(`${baseUrl}${url}${id}${limit}`);
    const response = await fetch (`${baseUrl}${url}${id}${limit}`, options);
    const data = await response.json();
    return data;
}

main();