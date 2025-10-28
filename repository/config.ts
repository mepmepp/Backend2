import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export const getConnection = () => {
    return new Client({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.HOST,
        port: 5432,
        database: process.env.DB,
    });
}