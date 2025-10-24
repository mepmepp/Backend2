import { verifyUnicity, pickRandomItem } from '../globals/functions.ts';
import { Attack, defaultAttack } from './attack.ts';

export class Pokemon {
    name: string;
    protected lifePoints: number;
    protected lifePointsTotal: number;
    protected attacks: Attack[]; 
    
    constructor(name: string, lifePointsTotal: number, attacks: Attack[] = [defaultAttack]) {
        this.name = name;
        this.lifePointsTotal = lifePointsTotal;
        this.lifePoints = lifePointsTotal;
        this.attacks = attacks;
    }

    // DESC : the pokemon learns a new attack he didn't learn yet
    // PARAMETERS :
    //              - attack (string) : attack that the pokemon learns
    // OUTPUT :
    //              - (boolean)
    //              - false if the attack was already learned (unique constraint)
    //              - true if the attack is learned
    learnAttack(attack: Attack) { 
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
        const lifeRegained = this.lifePointsTotal - this.lifePoints;
        this.lifePoints = this.lifePointsTotal;
        console.log(`pokemon.regainHealth - ${this.name} ragained ${lifeRegained}`);
    }


    // DESC : the pokemon attacks another, thus lowering down its health
    // PARAMETERS : 
    //              - victim (Pokemon): the victim of the attack
    // OUTPUT : 
    //              - (number) 
    //              - the lifePoints of the victim after the attack
    attack(victim: Pokemon) {
        const usedAttack = pickRandomItem(this.attacks);
        console.log(`pokemon.attack - ${this.name} is attacking ${victim.name}`);
        victim.lifePoints -= usedAttack.getDamage;
        console.log(`pokemon.attack - ${victim.name} took ${usedAttack?.getDamage} damage. It now has ${victim.lifePoints}/${victim.lifePointsTotal}`);
        return victim.lifePoints;
    }

    get getLifePoints() {
        return this.lifePoints;
    }    

    get getTotalLifePoints() {
        return this.lifePointsTotal;
    }

    get getLifePointsFormatted() {
        return `${this.lifePoints} / ${this.lifePointsTotal}`;
    }

    get getAttacks() {
        return this.attacks;
    }

}


const pok1 = new Pokemon("Salamèche", 80);
const smartAttack = new Attack('Smart Attack', 6, 30);
const pok2 = new Pokemon("Pikachu", 60, [smartAttack]);
console.log(pok1.getLifePointsFormatted);
console.log(pok1.getTotalLifePoints);
pok2.attack(pok1);
console.log(pok1.getLifePointsFormatted);
pok1.regainHealth();
