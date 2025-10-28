
export class Ability {
    protected id: number;
    protected name: string;
    protected damage: number;
    protected usageLimit: number;
    readonly countUsage: number = 0;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.damage = Math.floor(Math.random() * (80 - 10 + 1) + 10);
        this.usageLimit = Math.floor(Math.random() * (50 - 10 + 1) + 10);
        this.countUsage = this.countUsage++;
    }

    get getId() {
        return this.id;
    }

    get getName() {
        return this.name;
    }

    get getDamage() {
        return this.damage;
    }

    get getUsageLimit() {
        return `${this.countUsage} / ${this.usageLimit}`;
    }
}

export const defaultAttack = new Ability(1, "Default Attack");