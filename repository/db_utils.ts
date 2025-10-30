import { Ability } from "../models/abilities.ts";
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

    let pokemon;

    try {
        const results = await client.query("SELECT id, name, health, attack, ability1_id, ability2_id, ability3_id, artwork_url FROM pokemons WHERE id = $1", [pokemonId]);
        const { id, name, health, attack, artwork_url } = results.rows[0];
        const { ability1_id, ability2_id, ability3_id } = results.rows[0];
        console.log(`db_utils.pickPokemon - Picking the pokemon ${name}`);
        pokemon = new Pokemon(id, name, health, attack, undefined, artwork_url);

        const ability1 = getAbilityFromDB(ability1_id);
        const ability2 = getAbilityFromDB(ability2_id);
        const ability3 = getAbilityFromDB(ability3_id);

        if (ability1 instanceof Ability) {
            pokemon.learnAbility(ability1);
        }
        if (ability2 instanceof Ability) {
            pokemon.learnAbility(ability2);
        }
        if (ability3 instanceof Ability) {
            pokemon.learnAbility(ability3);
        }

    } catch (error) {
        console.error(`db_utils.pickPokemon - Error fetching pokemon n°${pokemonId}: `, error);
    }



    await client.end();   
    return pokemon;

}

const getAbilityFromDB = async(abilityId: number) => {
    if (!abilityId) return console.log('db_utils.getAbilityFromDB - Invalid request.');
    const client = getConnection();
    await client.connect();

    let ability;

    try {
        const results = await client.query("SELECT id, name, damage, usage_limit FROM abilities WHERE id = $1", [abilityId]);
        const { id, name, damage, usage_limit: usageLimit } = results.rows[0];
        console.log(`db_utils.getAbilityFromDB - Getting the ability ${name}`);
        ability = new Ability(id, name, damage, usageLimit);

    } catch (error) {
        console.error(`db_utils.getAbilityFromDB - Error fetching ability n°${abilityId}: `, error);
    } 
    
    await client.end();   
    return ability;

}