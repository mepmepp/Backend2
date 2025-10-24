
export class Attack {
    name: string;
    protected damage: number;
    protected usageLimit: number;
    readonly countUsage: number = 0;

    constructor(name: string, damage: number, usageLimit: number) {
        this.name = name;
        this.damage = damage;
        this.usageLimit = usageLimit;
        this.countUsage = this.countUsage++;
    }

    get getDamage() {
        return this.damage;
    }

    get getUsage() {
        return `${this.countUsage} / ${this.usageLimit}`;
    }
}

export const defaultAttack = new Attack("Default Attack", 5, 50);