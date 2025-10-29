import { Dresseur } from "../models/dresseur.ts";
import { Pokemon } from "../models/pokemon.ts";
import { getConnection } from "./config.ts";

export const updateDresseur = async(dresseur: Dresseur) => {
    if (!dresseur) return console.log('db_utils.insertDresseurs - Invalid request.');
    const client = getConnection();
    await client.connect();

    try {

    } catch (error) {
        console.error(`db_utils.insertDresseurs - Error inserting ability ${dresseur}: `, error)
    }

    await client.end();
}

export const pickPokemon = async(pokemonId: number) => {
    if (!pokemonId) return console.log('db_utils.pickPokemon - Invalid request.');
    const client = getConnection();
    await client.connect();

    try {
        const results = await client.query("SELECT id, name, health, attack, ability1_id, ability2_id, ability3_id, artwork_url FROM pokemons WHERE id = $1", [pokemonId]);
        const { id, name, health, attack, artwork_url } = results.rows[0];
        const { ability1_id, ability2_id, ability3_id } = results.rows[0];
        console.log(`db_utils.pickPokemon - Picking the pokemon ${name}`);
        return new Pokemon(id, name, health, attack, undefined, artwork_url);
    } catch (error) {
        console.error(`db_utils.pickPokemon - Error fetching pokemon n°${pokemonId}: `, error);
    }



    await client.end();   

}