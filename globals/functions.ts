import { Pokemon } from '../models/pokemon.ts';
import { Ability, defaultAttack } from '../models/abilities.ts';
// import { Dresseur } from '../models/dresseur.ts';

// DESC: Verify if a list of strings contains an element
// PARAMETERS: 
//              - element (string) : said element
//              - list (string[]) : said list
export const verifyUnicity = (element: string | Ability | number, list: Ability[] | string[] | number[]) => {
    for (let i = 0; i <= list.length - 1; i++) {
        console.log(`functions.verifyUnicity - ${list[i]} is being evaluated`);
        if (list[i] === element) {
            console.log(`functions.verifyUnicity - ${list[i]} is equal to ${element}`);
            return false;
        } 
    }
    console.log(`functions.verifyUnicity - ${element} is not in the list`);
    return true;
};

export const verifyUnicityInNumberLists = (list: number[]) => {
    for (let i = 0; i <= list.length - 1; i++) {
        console.log(`functions.verifyUnicityInNumberLists - ${list[i]} is being evaluated`);
        for (let j = i + 1; j <= list.length - 1; j++) {
            console.log(`functions.verifyUnicityInNumberLists - ${list[j]} is being compared to ${list[i]}`);
            if (list[i] === list[j]) {
                console.log(`functions.verifyUnicityInNumberLists - ${list[i]} is equal to ${list[j]}, [${list}] doesn't consist of unique numbers`);
                return false;
            }             
        }
    }
    console.log(`functions.verifyUnicityInNumberLists - [${list}] consists of unique numbers`);
    return true;
}

export const verifyIfNumberListContains = (list: number[], number: number) => {

}

// DESC: pick a random item in a list, no matter the type of the list item
// PARAMETERS : 
//              - list (list)
// OUTPUT : 
//              - random item in the list
export const pickRandomItem = (list: Ability[]) => {
    const listItem = list[Math.floor(Math.random() * list.length)];
    if (listItem === undefined) {
        return defaultAttack;
    }
    return listItem;
};

export const isPokemon = (value: unknown): value is Pokemon => {
    return value instanceof Pokemon;
}