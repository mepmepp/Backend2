import { Dresseur } from "../models/dresseur.ts";
import { getConnection } from "./config.ts";

export const updateDresseur = async(dresseur: Dresseur) => {
    if (!dresseur) return console.log('db_utils.insertDresseurs - Invalid request.');
    const client = getConnection();
    await client.connect();

    try {

    } catch (error) {
        console.error(`db_utils.insertDresseurs - Error inserting ability ${dresseur}: `, error)
    }

    await client.end();
}