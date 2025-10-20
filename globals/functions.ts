import { Pokemon } from '../models/pokemon.js';
import { Attack } from '../models/attack.js';
import { Dresseur } from '../models/dresseur.js';

// DESC: Verify if a list of strings contains an element
// PARAMETERS: 
//              - element (string) : said element
//              - list (string[]) : said list
export const verifyUnicity = (element: string, list: string[]) => {
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

// DESC: pick a random item in a list, no matter the type of the list item
// PARAMETERS : 
//              - list (list)
// OUTPUT : 
//              - random item in the list
export const pickRandomItem = (list: Attack[] | Pokemon[] | Dresseur[] | string[] | number[]) => {
    return list[Math.floor(Math.random() * list.length)];
};