import { Pokemon } from './pokemon.ts';

export class Dresseur {
    protected readonly id: number;
    private static incrementValue: number = 1;
    protected name: string;
    protected level: number;
    protected experience: number;
    protected pokemons: Pokemon[];
    
    constructor(name: string, level: number = 1, experience: number = 0) {
        this.id = Dresseur.incrementValue++;
        this.name = name;
        this.level = level;
        this.experience = experience;
        this.pokemons = [];
    }

    gainExp() {
        this.experience += 10;
    }

    addPokemon(pokemon: Pokemon) {
        this.pokemons.push(pokemon);
    }

    treatPokemons() {

    }

    get getId() {
        return this.id;
    }

    get getName() {
        return this.name;
    }

    get getLevel() {
        return this.level;
    }

    get getExperience() {
        return this.experience;
    }

    get getPokemons() {
        return this.pokemons;
    }

}