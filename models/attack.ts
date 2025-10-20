
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

    getDamage() {
        return this.damage;
    }

    getUsage() {
        return `${this.countUsage} / ${this.usageLimit}`;
    }
}