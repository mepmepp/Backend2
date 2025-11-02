import { Pokemon } from '../models/pokemon.ts';
import { Ability, defaultAttack } from '../models/abilities.ts';
import { Dresseur } from '../models/dresseur.ts';

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

export const pickRandomAbility = (list: Ability[]) => {
    const listItem = list[Math.floor(Math.random() * list.length)];
    if (listItem === undefined) {
        return defaultAttack;
    }
    return listItem;
};

export const pickRandomNumber = (list: number[]) => {
    const listItem = list[Math.floor(Math.random() * list.length)];
    return listItem;
}

export const pickRandomPokemon = (list: Pokemon[]) => {
    const listItem = list[Math.floor(Math.random() * list.length)];
    return listItem;
}

export const isPokemon = (value: unknown): value is Pokemon => {
    return value instanceof Pokemon;
}

export const isAbility = (value: unknown): value is Ability => {
    return value instanceof Ability;
}

export const isDresseur = (value: unknown): value is Dresseur => {
    return value instanceof Dresseur;
}

export const getFightNummer = (number: number) => {
    switch (number) {
        case 1:
            return "first";
        case 2:
            return "second";
        case 3:
            return "third";
        case 4:
            return "fourth";
        case 5:
            return "fifth";
        case 6:
            return "sixth";
        case 7:
            return "seventh";
        case 8:
            return "eighth";
        case 9:
            return "ninth";
        case 10:
            return "tenth";
        case 11:
            return "eleventh";
        case 12:
            return "twelfth";
        case 13:
            return "thirteenth";
        case 14:
            return "fourteenth";
        case 15:
            return "fifteenth";
        case 16:
            return "sixteenth";
        case 17:
            return "seventeenth";
        case 18:
            return "eighteenth";
        case 19:
            return "nineteenth";
        case 20:
            return "twentieth";
        case 21:
            return "twenty-first";
        case 22:
            return "twenty-second";
        case 23:
            return "twenty-third";
        case 24:
            return "twenty-fourth";
        case 25:
            return "twenty-fifth";
        case 26:
            return "twenty-sixth";
        case 27:
            return "twenty-seventh";
        case 28:
            return "twenty-eighth";
        case 29:
            return "twenty-ninth";
        case 30:
            return "thirtieth";
        case 31:
            return "thirty-first";
        case 32:
            return "thirty-second";
        case 33:
            return "thirty-third";
        case 34:
            return "thirty-fourth";
        case 35:
            return "thirty-fifth";
        case 36:
            return "thirty-sixth";
        case 37:
            return "thirty-seventh";
        case 38:
            return "thirty-eighth";
        case 39:
            return "thirty-ninth";
        case 40:
            return "fortieth";
        case 41:
            return "forty-first";
        case 42:
            return "forty-second";
        case 43:
            return "forty-third";
        case 44:
            return "forty-fourth";
        case 45:
            return "forty-fifth";
        case 46:
            return "forty-sixth";
        case 47:
            return "forty-seventh";
        case 48:
            return "forty-eighth";
        case 49:
            return "forty-ninth";
        case 50:
            return "fiftieth";
        case 51:
            return "fifty-first";
        case 52:
            return "fifty-second";
        case 53:
            return "fifty-third";
        case 54:
            return "fifty-fourth";
        case 55:
            return "fifty-fifth";
        case 56:
            return "fifty-sixth";
        case 57:
            return "fifty-seventh";
        case 58:
            return "fifty-eighth";
        case 59:
            return "fifty-ninth";
        case 60:
            return "sixtieth";
        case 61:
            return "sixty-first";
        case 62:
            return "sixty-second";
        case 63:
            return "sixty-third";
        case 64:
            return "sixty-fourth";
        case 65:
            return "sixty-fifth";
        case 66:
            return "sixty-sixth";
        case 67:
            return "sixty-seventh";
        case 68:
            return "sixty-eighth";
        case 69:
        return "sixty-ninth";
        case 70:
        return "seventieth";
        case 71:
        return "seventy-first";
        case 72:
        return "seventy-second";
        case 73:
        return "seventy-third";
        case 74:
        return "seventy-fourth";
        case 75:
        return "seventy-fifth";
        case 76:
        return "seventy-sixth";
        case 77:
        return "seventy-seventh";
        case 78:
        return "seventy-eighth";
        case 79:
        return "seventy-ninth";
        case 80:
        return "eightieth";
        case 81:
        return "eighty-first";
        case 82:
        return "eighty-second";
        case 83:
        return "eighty-third";
        case 84:
        return "eighty-fourth";
        case 85:
        return "eighty-fifth";
        case 86:
        return "eighty-sixth";
        case 87:
        return "eighty-seventh";
        case 88:
        return "eighty-eighth";
        case 89:
        return "eighty-ninth";
        case 90:
        return "ninetieth";
        case 91:
        return "ninety-first";
        case 92:
        return "ninety-second";
        case 93:
        return "ninety-third";
        case 94:
        return "ninety-fourth";
        case 95:
        return "ninety-fifth";
        case 96:
        return "ninety-sixth";
        case 97:
        return "ninety-seventh";
        case 98:
        return "ninety-eighth";
        case 99:
        return "ninety-ninth";
        case 100:
        return "one hundredth";
        default:
        return "unknown";
    }
}

export const setSpecificTimeout = (time: number, phrase: string) => {
    setTimeout(() => console.log(phrase), time);
    return time += 900;
}

export const wait = (time: number = 50) => {
    return new Promise(resolve => setTimeout(resolve, time));
}