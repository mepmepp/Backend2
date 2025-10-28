import { getConnection } from './config.ts';
import { Pokemon } from '../models/pokemon.ts';
import type { Attack } from '../models/attack.ts';
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

export const insertAbilities = async(ability: Attack) => {
    if (!ability) return console.log('fixtures_utils.insertAbilities - Invalid request.');
    const client = getConnection();
    await client.connect();

    try {

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