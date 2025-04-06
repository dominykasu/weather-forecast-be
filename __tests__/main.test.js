const request = require('supertest');
const express = require('express');
const logRoutes = require('../routes/main');
const pool = require('../db');

jest.mock('../db', () => ({
    query: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use('/api', logRoutes);

describe('POST /api/log endpoint', () => {
    beforeEach(() => {
        pool.query.mockReset();
    });

    it('should return status code 400 if city is not provided', async () => {
        const response = await request(app)
            .post('/api/log')
            .send({});

        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: 'City is required' });
        expect(pool.query).not.toHaveBeenCalled();
    });

    it('should return status code 201 and the logged city if successful', async () => {
        const mockResult = {
            rows: [{ city: 'Good City', timestamp: new Date().toISOString() }],
        };
        pool.query.mockResolvedValue(mockResult);

        const response = await request(app)
            .post('/api/log')
            .send({ city: 'Good City' });

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual(mockResult.rows[0]);
        expect(pool.query).toHaveBeenCalledWith(
            'INSERT INTO logs (city, timestamp) VALUES ($1, NOW()) RETURNING *',
            ['Good City']
        );
    });

    it('should return status code 500 if there is a database error', async () => {
        const mockError = new Error('Database connection error');
        pool.query.mockRejectedValue(mockError);

        const response = await request(app)
            .post('/api/log')
            .send({ city: 'Bad City' });

        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({ error: 'Could not save the city' });
        expect(pool.query).toHaveBeenCalledWith(
            'INSERT INTO logs (city, timestamp) VALUES ($1, NOW()) RETURNING *',
            ['Bad City']
        );
    });
});