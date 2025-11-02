import express from 'express';
import type { Request, Response } from 'express';
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
    app.get('/', (request, response) => response.send(
        `<h1>Welcome to Pokemon Challenges!</h1>
        <h2>Routes:</h2>
        <h3>Random Challenges:</h3>
        <p>/random-challenge?dresseur={dresseur-id}</p>
        <p><b>Hint</b>: You can choose between 1 and 2.</p>
        <h3>Deterministic Challenge:</h3>
        <p>/deterministic-challenge?dresseur={dresseur-id}</p>
        <p><b>Hint</b>: You can choose between 1 and 2.</p>
        <h3>First Arena:</h3>
        <p>/first-arena</p>
        <h3>Second Arena:</h3>
        <p>/second-arena</p>`));

    app.get('/random-challenge', (request, response) => randomChallenge(request, response));
    app.get('/deterministic-challenge', (request, response) => deterministicChallenge(request, response));
    app.get('/first-arena', (request, response) => firstArena(request, response));
    app.get('/second-arena', (request, response) => secondArena(request, response));
}

main();

app.listen(port, () => {
    console.log(`DB-Test listening on port ${port}`);
});