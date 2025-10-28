import { getConnection } from './config.ts';
import { Pokemon } from '../models/pokemon.ts';
import type { Ability } from '../models/abilities.ts';
import { Dresseur } from '../models/dresseur.ts';

export const insertPokemons = async(pokemon: Pokemon) => {
    if (!pokemon) return console.log('fixtures_utils.insertPokemons - Invalid request.');
    const client = getConnection();
    await client.connect();

    try {
        console.log(`fixtures_utils.insertPokemons - Inserting -> id: ${pokemon.getId}; name: ${pokemon.getName}; health:${pokemon.getHealth}; attack: ${pokemon.getAttackStat}`);
        await client.query('INSERT INTO pokemons (id, name, health, attack, artwork_url) VALUES ($1, $2, $3, $4, $5);', [pokemon.getId, pokemon.getName, pokemon.getHealth, pokemon.getAttackStat, pokemon.getArtworkUrl]);
    } catch (error) {
        console.error(`pokemon_fixtures.insertPokemons - Error inserting pokemon ${pokemon.getName}: `, error);
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