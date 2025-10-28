import { verifyUnicity, pickRandomItem } from '../globals/functions.ts';
import { Ability, defaultAttack } from './abilities.ts';

export class Pokemon {
    protected id: number;
    protected name: string;
    protected health: number;
    protected healthTotal: number;
    protected attackStat: number;
    protected attacks: Ability[]; 
    protected artworkUrl: string;
    
    constructor(id: number, name: string, healthTotal: number, attackStat: number, attacks: Ability[] = [defaultAttack], artworkUrl: string) {
        this.id = id;
        this.name = name; // db has a unique constraint for this property
        this.healthTotal = healthTotal;
        this.health = healthTotal;
        this.attackStat = attackStat;
        this.attacks = attacks;
        this.artworkUrl = artworkUrl;
    }

    // DESC : the pokemon learns a new attack he didn't learn yet
    // PARAMETERS :
    //              - attack (string) : attack that the pokemon learns
    // OUTPUT :
    //              - (boolean)
    //              - false if the attack was already learned (unique constraint)
    //              - true if the attack is learned
    learnAttack(attack: Ability) { 
        console.log(`pokemon.learnAttack - ${this.name} has ${this.attacks[0]}, ${this.attacks[1]}, ${this.attacks[2]}, ${this.attacks[3]}`);

        if (verifyUnicity(attack, this.attacks)) {
            console.log(`pokemon.learnAttack - ${this.name} already learned ${attack}, no need to relearn it!`);
            return false;
        }
        this.attacks.push(attack);
        if (this.attacks.length >= 4) {
            this.attacks.shift();
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
    attack(victim: Pokemon) {
        const usedAttack = pickRandomItem(this.attacks);
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

    get getAttackStat() {
        return this.attackStat;
    }

    get getAttacks() {
        return this.attacks;
    }

    get getAttack1() {
        return this.attacks[0];
    }

    get getAttack2() {
        return this.attacks[1];
    }

    get getAttack3() {
        return this.attacks[2];
    }

    get getArtworkUrl() {
        return this.artworkUrl;
    }

}

export const pokExemple = new Pokemon(1, "Pokemon Exemple", 70, 30, undefined, "http:/exemple.com");
console.log(pokExemple.getAttack1);

