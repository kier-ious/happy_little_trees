const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

// Connect to MongoDB before running tests
beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
});

// Close the MongoDB connection after tests are complete
afterAll(async () => {
    await mongoose.connection.close();
});

describe('GET /paintings/:id', () => {
    it('should return a single painting', async () => {
        const validId = '66b115155ca1b8684a468b73';
        const res = await request(app).get(`/paintings/${validId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('painting_title');
    });
});
