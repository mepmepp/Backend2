import  { verifyUnicity } from '../globals/functions.ts';
const testList = ["banane", "orange", "pomme"];
const checkUnique = verifyUnicity("yo", testList);
console.log('test.checkUnique - verifyUnicity returns: ', checkUnique);
const checkExistsBanane = verifyUnicity("banane", testList);
console.log('test.checkExists - verifyUnicity returns: ', checkExistsBanane);
const checkExistsPomme = verifyUnicity("pomme", testList);
console.log('test.checkExists - verifyUnicity returns: ', checkExistsPomme);