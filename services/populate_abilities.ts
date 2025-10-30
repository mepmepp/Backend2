// Script I runned once to fill my database
import { Ability } from '../models/abilities.ts';
import { insertAbilities } from '../repository/fixtures_utils.ts';
import { fetchData } from './api_pokemon.ts';

const main = async() => {
    const abilityUrl = "/ability";
    for (let i = 1; i <= 40; i++) {
        let ability = await fetchData(abilityUrl, `/${i.toString()}`, "");
        const abilityName = ability.name.toString()[0].toUpperCase() + ability.name.slice(1);
        console.log(`populate_abbilities.main - ${i}- Parsing ${abilityName}...`);
        ability = new Ability(i, abilityName); 
        await insertAbilities(ability);
    }

}

main();