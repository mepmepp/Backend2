import { Pokemon } from './pokemon.ts';

export class Dresseur {
    name: string;
    level: number;
    experience: number;
    pokemons: Pokemon[];
    
    constructor(name: string) {
        this.name = name;
        this.level = 1;
        this.experience = 0;
        this.pokemons = [];
    }

    gainExp() {

    }

    addPokemon() {

    }

    treatPokemons() {

    }

}