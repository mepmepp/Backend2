import { verifyUnicity, pickRandomItem } from '../globals/functions.ts';
import { Ability, defaultAttack } from './abilities.ts';

export class Pokemon {
    protected id: number;
    protected name: string;
    protected health: number;
    protected healthTotal: number;
    protected attack: number;
    protected abilities: Ability[]; 
    protected artworkUrl: string;
    
    constructor(id: number, name: string, healthTotal: number, attack: number, abilities: Ability[] = [defaultAttack], artworkUrl: string) {
        this.id = id;
        this.name = name; // db has a unique constraint for this property
        this.healthTotal = healthTotal;
        this.health = healthTotal;
        this.attack = attack;
        this.abilities = abilities;
        this.artworkUrl = artworkUrl;
    }

    // DESC : the pokemon learns a new attack he didn't learn yet
    // PARAMETERS :
    //              - attack (string) : attack that the pokemon learns
    // OUTPUT :
    //              - (boolean)
    //              - false if the attack was already learned (unique constraint)
    //              - true if the attack is learned
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

    // DESC : method that heals the pokemon
    // PARAMETERS : none
    // OUTPUT : void
    regainHealth() {
        const lifeRegained = this.healthTotal - this.health;
        this.health = this.healthTotal;
        console.log(`pokemon.regainHealth - ${this.name} ragained ${lifeRegained}`);
    }


    // DESC : the pokemon attacks another, thus lowering down its health
    // PARAMETERS : 
    //              - victim (Pokemon): the victim of the attack
    // OUTPUT : 
    //              - (number) 
    //              - the health of the victim after the attack
    assault(victim: Pokemon) {
        const usedAttack = pickRandomItem(this.abilities);
        console.log(`pokemon.attack - ${this.name} is attacking ${victim.name}`);
        victim.health -= usedAttack.getDamage;
        console.log(`pokemon.attack - ${victim.name} took ${usedAttack?.getDamage} damage. It now has ${victim.health}/${victim.healthTotal}`);
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

export const pokExemple = new Pokemon(1, "Pokemon Exemple", 70, 30, undefined, "http:/exemple.com");
console.log(pokExemple.getAbility1);

