import type { Request, Response } from 'express';
import { getFightNummer, isPokemon, pickRandomNumber, wait } from '../globals/functions.ts';
import { Dresseur } from '../models/dresseur.ts';
import { getDresseur, getDresseurPokemonsId, pickPokemon } from '../repository/db_utils.ts';
import { Pokemon } from '../models/pokemon.ts';

export const firstArena = async(request: Request, response: Response) => {
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

    let userPokemon: Pokemon;
    let userPokemonId: number;
    let userPokemonsId: number[] = [];
    let futureUserPokemon;
    let futureUserPokemonId;
    
    userPokemonsId = await getDresseurPokemonsId(userDresseur.getId); 
    futureUserPokemonId = pickRandomNumber(userPokemonsId); 
    if (futureUserPokemonId) {
        userPokemonId = futureUserPokemonId;
        futureUserPokemon = await pickPokemon(userPokemonId);
    }
    if (isPokemon(futureUserPokemon)) userPokemon = futureUserPokemon;
    else return console.log(`first_arena.firstArena - An error occured while assigning the user his random pokemon.`)

    let enemyPokemon: Pokemon;
    let enemyPokemonId: number;
    let enemyPokemonsId: number[] = [];
    let futureEnemyPokemon;
    let futureEnemyPokemonId;

    if (enemyDresseur instanceof Dresseur) enemyPokemonsId = await getDresseurPokemonsId(enemyDresseur.getId);
    else return console.log("first_arena.firstArena - An error occured while getting the enemy dresseur.");
    futureEnemyPokemonId = pickRandomNumber(enemyPokemonsId); 
    if (futureEnemyPokemonId) {
        enemyPokemonId = futureEnemyPokemonId;
        futureEnemyPokemon = await pickPokemon(enemyPokemonId);
    }
    if (isPokemon(futureEnemyPokemon)) enemyPokemon = futureEnemyPokemon;
    else return console.log(`first_arena.firstArena - An error occured while assigning the enemy his random pokemon.`)


    if ((userDresseur && enemyDresseur) instanceof Dresseur && (userPokemon && enemyPokemon) instanceof Pokemon) {
        await wait();
        console.log(`Hello \x1b[33m${userDresseur.getName}\x1b[0m.`);
        await wait();
        console.log(`You picked \x1b[33mRandom Challenge\x1b[0m.`);
        await wait();
        console.log("You and your enemy will both receive a random pokemon.");
        await wait();
        console.log(`You will fight ${enemyDresseur.getName} that has ${enemyPokemon.getName}.`);
        await wait();
        console.log(`${userPokemon.getName} will help you.`);
        await wait();
        console.log(`It has ${userPokemon.getHealth}hp and ${userPokemon.getAttack} damage.`);
        await wait();
        console.log(`Your enemy pokemon has ${enemyPokemon.getHealth}hp and ${enemyPokemon.getAttack} damage.`);
        await wait();
        console.log("Shall the best win!");
        await wait();
        console.log("The fight begins!");

        let userPokemonDeathCounter: number = 0;
        let enemyPokemonDeathCounter: number = 0;

        for (let i = 1; i <= 100; i++) {
            console.log('\x1b[33m%s\x1b[0m', `Ready for the ${getFightNummer(i)} round?`);
            while (userPokemon.getHealth > 0 && enemyPokemon.getHealth > 0) {
                await wait();
                userPokemon.assault(enemyPokemon);
                await wait();
                console.log(`You attacked ${enemyDresseur.getName}'s pokemon.`);
                await wait();
                console.log(`It has ${enemyPokemon.getHealthFormatted}hp left.`);
                await wait();

                if (enemyPokemon.getHealth <= 0) break;
                enemyPokemon.assault(userPokemon);
                console.log(`${enemyDresseur.getName}'s pokemon attacked yours.`);
                await wait();
                console.log(`Your pokemon has ${userPokemon.getHealthFormatted}hp left.`);
                await wait();

                if (userPokemon.getHealth <= 0) break;
                enemyPokemon.assault(userPokemon);
                console.log(`${enemyDresseur.getName}'s pokemon attacked yours.`);
                await wait();
                console.log(`Your pokemon has ${userPokemon.getHealthFormatted}hp.`);
                await wait();

                if (userPokemon.getHealth <= 0) break;
                userPokemon.assault(enemyPokemon);
                console.log(`You attacked ${enemyDresseur.getName}'s pokemon.`);
                await wait();
                console.log(`The ${enemyDresseur.getName}'s pokemon attacked yours.`);
                await wait();
            }

            if (userPokemon.getHealth <= 0) {
                userPokemonDeathCounter++;
                enemyDresseur.gainExp();
                if (userPokemonDeathCounter > 1) console.log(`You lost this round. You lost \x1b[32m${userPokemonDeathCounter}\x1b[0m times.`);
                else console.log(`You lost this round. You lost \x1b[32m${userPokemonDeathCounter}\x1b[0m time.`);
                await wait();
            } else if (enemyPokemon.getHealth <= 0) {
                enemyPokemonDeathCounter++;
                userDresseur.gainExp();
                if (enemyPokemonDeathCounter > 1) console.log(`${enemyDresseur.getName} lost this round. He has lost \x1b[31m${enemyPokemonDeathCounter}\x1b[0m times.`);
                else console.log(`${enemyDresseur.getName} lost this round. He has lost \x1b[31m${enemyPokemonDeathCounter}\x1b[0m time.`);
            } else {
                console.log(`AN ERROR OCCURED IN THE POKEMONS HEALTH CALCULUS!`);
            } 


            userPokemon.regainHealth();
            enemyPokemon.regainHealth();
        
        }

        console.log(`Pokemons: \x1b[32m${userPokemon.getName}\x1b[0m against \x1b[31m${enemyPokemon.getName}\x1b[0m!`);
        console.log(`Score: You won \x1b[32m${enemyPokemonDeathCounter}\x1b[0m out of \x1b[31m${userPokemonDeathCounter}\x1b[0m!`);

        if (userPokemonDeathCounter > enemyPokemonDeathCounter) console.log('\x1b[31m%s\x1b[0m', 'You lose!');
        else if (userPokemonDeathCounter < enemyPokemonDeathCounter) console.log('\x1b[32m%s\x1b[0m', 'You win!');
        else { 
            console.log('\x1b[36m\x1b[0m', 'Scores are equal!');
            if (userDresseur.getExperience > enemyDresseur.getExperience) console.log('\x1b[32m%s\x1b[0m', 'You have more experience, you win!');
            else if (userDresseur.getExperience < enemyDresseur.getExperience) console.log('\x1b[32m%s\x1b[0m', 'Your enemy has more experience, you lose!');
        };
    }
}