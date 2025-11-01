import { getConnection } from './config.ts';
import { Pokemon } from '../models/pokemon.ts';
import { Ability } from '../models/abilities.ts';
import { Dresseur } from '../models/dresseur.ts';
import { verifyUnicityInNumberLists } from '../globals/functions.ts';
import { verifyUnicity } from '../globals/functions.ts';

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
    let abilitiesId;
    while (true) {
        abilitiesId = [Math.floor(Math.random() * 40), Math.floor(Math.random() * 40), Math.floor(Math.random() * 40)];
        if (verifyUnicityInNumberLists(abilitiesId) && verifyUnicity(0, abilitiesId)) break;
        console.log(`fixtures_utils.insertPokemonsAbilities - Verifications on [${abilitiesId}] failed! Reproceeding...`)
    }

    const client = getConnection();
    await client.connect();

    
    let pokemonsAbilities: Ability[] = [];
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
            await client.query(`UPDATE pokemons SET ability${i}_id = $1 WHERE id = $2;`, [pokemonsAbilities[i-1]?.getId, pokemon.getId]);
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
    if (!dresseur) return console.log('fixtures_utils.insertDresseur - Invalid request.');
    const client = getConnection();
    await client.connect();

    try {
        console.log(`fixtures_utils.insertDresseur - Inserting -> id: ${dresseur.getId}; name: ${dresseur.getName}; level:${dresseur.getLevel}; experience: ${dresseur.getExperience}`);
        await client.query('INSERT INTO dresseurs (id, name, level, experience) VALUES ($1, $2, $3, $4);', [dresseur.getId, dresseur.getName, dresseur.getLevel, dresseur.getExperience]);

    } catch (error) {
        console.error(`fixtures_utils.insertDresseur - Error inserting ability ${dresseur}: `, error)
    }

    await client.end();
}

export const insertDresseurPokemons = async(dresseur: Dresseur) => {
    if (!dresseur) return console.log('fixtures_utils.insertDresseurPokemons - Invalid request.');
    const client = getConnection();
    await client.connect();

    const pokemons: Pokemon[] = dresseur.getPokemons;
    console.log(pokemons);

    for (let i = 0; i <= pokemons.length - 1; i++) {
        try {
            console.log(`fixtures_utils.insertDresseurPokemons - Inserting pokemons of ${dresseur.getName}-> ${pokemons[i]?.getName}`);
            await client.query('INSERT INTO dresseur_pokemons (dresseur_id, pokemon_id) VALUES ($1, $2);', [dresseur.getId, pokemons[i]?.getId]);
        } catch (error) {
            console.error(`fixtures_utils.insertDresseurPokemons - Error inserting pokemon ${pokemons[i]?.getName} to dresseur ${dresseur.getName}: `, error)
        }
    }

    await client.end();
}