import { getConnection } from './config.ts';
import { Pokemon } from '../models/pokemon.ts';
import { Ability } from '../models/abilities.ts';
import { Dresseur } from '../models/dresseur.ts';

export const insertPokemons = async(pokemon: Pokemon) => {
    if (!pokemon) return console.log('fixtures_utils.insertPokemons - Invalid request.');
    const client = getConnection();
    await client.connect();

    try {
        console.log(`fixtures_utils.insertPokemons - Inserting -> id: ${pokemon.getId}; name: ${pokemon.getName}; health:${pokemon.getHealth}; attack: ${pokemon.getAttack}`);
        await client.query('INSERT INTO pokemons (id, name, health, attack, artwork_url) VALUES ($1, $2, $3, $4, $5);', [pokemon.getId, pokemon.getName, pokemon.getHealth, pokemon.getAttack, pokemon.getArtworkUrl]);
    } catch (error) {
        console.error(`pokemon_fixtures.insertPokemons - Error inserting pokemon ${pokemon.getName}: `, error);
    }

    await client.end();
}

export const insertPokemonsAbilities = async(pokemon: Pokemon) => {
    let abilitiesId = [Math.floor(Math.random() * 40), Math.floor(Math.random() * 40), Math.floor(Math.random() * 40)];
    let pokemonsAbilities: Ability[] = [];

    const client = getConnection();
    await client.connect();

    for (let i = 1; i <= 3; i++) {
        try {
            const results = await client.query("SELECT id, name, damage, usage_limit FROM abilities WHERE id = $1", [abilitiesId[i-1]]);
            const { id, name, damage, usage_limit: usageLimit } = results.rows[0];
            console.log(`fixtures_utils.insertPokemonsAbilities - Fetching ability ${name}`);
            let ability = new Ability(id, name, damage, usageLimit);
            pokemonsAbilities.push(ability);
        } catch (error) {
            console.error(`fixtures_utils.insertPokemonsAbilities - Error fetching ability n°${abilitiesId[i-1]}: `, error);
        }
    }

     for (let i = 1; i <= 3; i++) {
        try {
            console.log(`fixtures_utils.insertPokemonsAbilities - Inserting -> id: ${pokemonsAbilities[i-1]?.getId}; name: ${pokemonsAbilities[i-1]?.getName}; damage:${pokemonsAbilities[i-1]?.getDamage}; usage limit: ${pokemonsAbilities[i-1]?.getUsageLimit}`);
            await client.query(`UPDATE pokemons SET ability${i}_id = $1 WHERE id = $2;`, [i, pokemonsAbilities[i-1]?.getId]);
        } catch (error) {
            console.error(`fixtures_utils.insertPokemonsAbilities - Error inserting ability n°${i} to pokemon: `, error);
        }
    }

    await client.end();       
    
}

export const insertAbilities = async(ability: Ability) => {
    if (!ability) return console.log('fixtures_utils.insertAbilities - Invalid request.');
    const client = getConnection();
    await client.connect();

    try {
        console.log(`fixtures_utils.insertAbilities - Inserting -> id: ${ability.getId}; name: ${ability.getName}; damage:${ability.getDamage}; usage limit: ${ability.getUsageLimit}`);
        await client.query('INSERT INTO abilities (id, name, damage, usage_limit) VALUES ($1, $2, $3, $4);', [ability.getId, ability.getName, ability.getDamage, ability.getUsageLimit]);
    } catch (error) {
        console.error(`fixtures_utils.insertAbilities - Error inserting ability ${ability}: `, error)
    }

    await client.end();
}

export const insertDresseur = async(dresseur: Dresseur) => {
    if (!dresseur) return console.log('fixtures_utils.insertDresseurs - Invalid request.');
    const client = getConnection();
    await client.connect();

    try {

    } catch (error) {
        console.error(`fixtures_utils.insertDresseurs - Error inserting ability ${dresseur}: `, error)
    }

    await client.end();
}