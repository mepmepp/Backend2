import type { Request, Response } from 'express';
import { isPokemon, wait } from '../globals/functions.ts';
import { Dresseur } from '../models/dresseur.ts';
import { getDresseur, getDresseurPokemonsId, pickPokemon } from '../repository/db_utils.ts';
import { Pokemon } from '../models/pokemon.ts';

export const deterministicChallenge = async(request: Request, response: Response) => {
    const userDresseurId = request.query.dresseur as string | undefined;
    if (!userDresseurId) { 
        console.log("You need to add a query parameter to the request.");
        return response.status(400).send("<h1>You need to add a dresseur query parameter to the request.</h1>");
    }
    
    let userDresseur;
    if (typeof userDresseurId === "string") userDresseur = await getDresseur(parseInt(userDresseurId));
    if (userDresseur instanceof Dresseur) {
        response.status(200).send("<h1>Valid request. See logs for the rest of the game.</h1>");
    }
    else {
        console.log("Invalid dresseur ID. This dresseur doesn't exist.");
        return response.status(400).send("<h1>Invalid dresseur ID. This dresseur doesn't exist.</h1>");
    }

    let enemyDresseur;
    if (userDresseurId === "1") enemyDresseur = await getDresseur(2); 
    else if (userDresseurId === "2") enemyDresseur = await getDresseur(1);

    let userPokemon: Pokemon | undefined;
    let userPokemonsId: number[] = await getDresseurPokemonsId(userDresseur.getId); 

    let betterHealth: number = 0;
    let userBetterPokemon: Pokemon | undefined;
    for (let i = 0; i <= userPokemonsId.length - 1; i++) {
        if (typeof userPokemonsId[i] === "number") {
            const pokemonBeingParsed = await pickPokemon(userPokemonsId[i]!);
            if (pokemonBeingParsed) {
                if (pokemonBeingParsed.getHealth > betterHealth) {
                    userBetterPokemon = pokemonBeingParsed;
                    betterHealth = pokemonBeingParsed.getHealth;
                } 
            }
        }
    }

    if (!isPokemon(userBetterPokemon)) return console.log(`deterministic_challenge.deterministicChallenge - An error occured while assigning the user his random pokemon.`);

    let enemyPokemon: Pokemon | undefined;
    let enemyPokemonsId: number[] = [];
    if (enemyDresseur instanceof Dresseur) enemyPokemonsId = await getDresseurPokemonsId(enemyDresseur.getId);
    else return console.log("deterministic_challenge.deterministicChallenge - An error occured while getting the enemy dresseur.");

    betterHealth = 0;
    let enemyBetterPokemon: Pokemon | undefined;
    for (let i = 0; i <= userPokemonsId.length - 1; i++) {
        if (typeof enemyPokemonsId[i] === "number") {
            const pokemonBeingParsed = await pickPokemon(enemyPokemonsId[i]!);
            if (pokemonBeingParsed) {
                if (pokemonBeingParsed.getHealth > betterHealth) {
                    enemyBetterPokemon = pokemonBeingParsed;
                    betterHealth = pokemonBeingParsed.getHealth;
                } 
            }
        }
    }

    if (!isPokemon(enemyBetterPokemon)) return console.log(`deterministic_challenge.deterministicChallenge - An error occured while assigning the user his random pokemon.`)
//

    if (enemyDresseur instanceof Dresseur && userPokemon instanceof Pokemon && enemyPokemon instanceof Pokemon) {
        await wait();
        console.log(`Hello \x1b[33m${userDresseur.getName}\x1b[0m.`);
        await wait();
        console.log(`You picked \x1b[33mDeterministic Challenge\x1b[0m.`);
        await wait();
        console.log("You and your enemy will both receive the pokemon with the highest health amount.");
        await wait();
        console.log(`You will fight ${enemyDresseur.getName}.`);
        await wait();
        console.log(`His star pokemon is ${enemyPokemon.getName}.`);
        await wait();
        console.log(`It has ${enemyPokemon.getHealth}hp and ${enemyPokemon.getAttack} damage.`);
        await wait();
        console.log(`Your star pokemon is ${userPokemon.getName}.`);
        await wait();
        console.log(`It has ${userPokemon.getHealth}hp and ${userPokemon.getAttack} damage.`);
        await wait();
        console.log("Shall the best pokemon survive!");
        await wait();
        console.log("The fight begins now!");

            while (userPokemon.getHealth > 0 && enemyPokemon.getHealth > 0) {
                await wait();
                userPokemon.assault(enemyPokemon);
                await wait();
                console.log(`You attacked ${enemyDresseur.getName}'s pokemon.`);
                await wait();
                console.log(`It has \x1b[31m${enemyPokemon.getHealthFormatted} hp\x1b[0m left.`);
                await wait();

                if (enemyPokemon.getHealth <= 0) break;
                enemyPokemon.assault(userPokemon);
                console.log(`${enemyDresseur.getName}'s pokemon attacked yours.`);
                await wait();
                console.log(`Your pokemon has \x1b[32m${userPokemon.getHealthFormatted} hp\x1b[0m left.`);
                await wait();

            }

            if (userPokemon.getHealth <= 0) console.log('\x1b[31m%s\x1b[0m', 'You lose!');
            else if (enemyPokemon.getHealth <= 0) console.log('\x1b[32m%s\x1b[0m', 'You win!');
            else console.log('An error occured in the combat...');

    }

}