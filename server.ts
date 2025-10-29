import express from 'express';
import dotenv from 'dotenv';
import { randomChallenge } from './controller/random_challenge.ts';
import { deterministicChallenge } from './controller/deterministic_challenge.ts';
import { firstArena } from './controller/first_arena.ts';
import { secondArena } from './controller/second_arena.ts';
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

const main = () => {
    app.get('/random-challenge', (request, response) => randomChallenge(request, response));
    app.get('deterministic-challenge', (request, response) => deterministicChallenge(request, response));
    app.get('/first-arena', (request, response) => firstArena(request, response));
    app.get('/second-arena', (request, response) => secondArena(request, response));
}

main();

app.listen(port, () => {
    console.log(`DB-Test listening on port ${port}`);
});