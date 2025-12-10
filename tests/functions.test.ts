import { verifyUnicity } from "../globals/functions.ts";
import type { Ability } from "../models/abilities.ts";
import { abilityExisting, abilityStrong, abilityNeutral } from "./mockClasses.ts";

const abilityList: Ability[] = [abilityExisting, abilityStrong];

describe('functions - verifyUnicity', () => {
    test('Is ability already in list? Yes!', () => {
        expect(verifyUnicity(abilityExisting, abilityList)).toBe(false);
    });

    test('Is ability already in list? No!', () => {
        expect(verifyUnicity(abilityNeutral, abilityList)).toBe(true);
    });
});