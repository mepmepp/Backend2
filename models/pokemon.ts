import { verifyUnicity, pickRandomAbility } from '../globals/functions.ts';
import { Ability, defaultAttack } from './abilities.ts';

export class Pokemon {
    protected id: number;
    protected name: string;
    protected health: number;
    protected healthTotal: number;
    protected attack: number;
    protected abilities: Ability[]; 
    protected artworkUrl: string;
    
    constructor(id: number, name: string, healthTotal: number, attack: number, artworkUrl: string, abilities = [defaultAttack]) {
        this.id = id;
        this.name = name; // db has a unique constraint for this property
        this.healthTotal = healthTotal;
        this.health = healthTotal;
        this.attack = attack;
        this.abilities = abilities;
        this.artworkUrl = artworkUrl;
    }

    learnAbility(attack: Ability) { 
        console.log(`pokemon.learnAttack - ${this.name} has ${this.abilities[0]}, ${this.abilities[1]}, ${this.abilities[2]}, ${this.abilities[3]}`);

        if (verifyUnicity(attack, this.abilities)) {
            console.log(`pokemon.learnAttack - ${this.name} already learned ${attack}, no need to relearn it!`);
            return false;
        }
        this.abilities.push(attack);
        if (this.abilities.length >= 4) {
            this.abilities.shift();
        }
        console.log(`pokemon.learnAttack - ${this.name} learned ${attack}!`);
        return true;
    }

    regainHealth() {
        const lifeRegained = this.healthTotal - this.health;
        this.health = this.healthTotal;
        // console.log(`pokemon.regainHealth - ${this.name} ragained ${lifeRegained}`);
    }

    assault(victim: Pokemon) {
        const usedAttack = pickRandomAbility(this.abilities);
        // console.log(`pokemon.attack - ${this.name} is attacking ${victim.name}`);
        victim.health -= Math.floor((usedAttack.getDamage * Math.random() * 0.9) + (this.getAttack * Math.random() * 0.1));
        // console.log(`pokemon.attack - ${victim.name} took ${usedAttack?.getDamage} damage. It now has ${victim.health} / ${victim.healthTotal}hp.`);
        return victim.health;
    }

    get getId() {
        return this.id;
    }

    get getName() {
        return this.name;
    }

    get getHealth() {
        return this.health;
    }    

    get getTotalHealth() {
        return this.healthTotal;
    }

    get getHealthFormatted() {
        return `${this.health} / ${this.healthTotal}`;
    }

    get getAttack() {
        return this.attack;
    }

    get getAbilities() {
        return this.abilities;
    }

    get getAbility1() {
        return this.abilities[0];
    }

    get getAbility2() {
        return this.abilities[1];
    }

    get getAbility3() {
        return this.abilities[2];
    }

    get getArtworkUrl() {
        return this.artworkUrl;
    }

}

export const pokExemple = new Pokemon(1, "Pokemon Exemple", 70, 30, "http:/exemple.com");
pokExemple.getAbility1;

