import { Pokemon } from '../models/pokemon.ts';
import { Ability } from '../models/abilities.ts';

export const pokemonStrong = new Pokemon(1, "Pokemon Strong", 100, 40, "https://example-strong.com");
export const pokemonExisting = new Pokemon(2, "Pokemon Existing", 3, 3, "https://example-existing.com");
export const pokemonNeutral = new Pokemon(3, "Pokemon Neutral", 60, 30, "https://example-neutral.com");

export const abilityStrong = new Ability(1, "Ability Strong", 100, 1);
export const abilityExisting = new Ability(2, "Ability Existing", 9, 100);
export const abilityNeutral = new Ability(3, "Ability Neutral", 40, 30);