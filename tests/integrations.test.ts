import request from 'supertest';
import { app } from '../server.ts'

describe('Integration tests on server', () => {
    test('GET on /root - Returns 200', async() => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });
    test('GET on /deterministic_challenge - Returns 200',async() => {
        const response = await request(app).get('/deterministic-challenge?dresseur=1');
        expect(response.status).toBe(200);
    });
    test('GET on /deterministic_challenge - Returns 404',async() => {
        const response = await request(app).get('/deterministic-challenge?dresseur=0');
        expect(response.status).toBe(404);
    });

});