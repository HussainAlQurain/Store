import supertest from 'supertest'
import app from '../../server'
import createTestDb from '../helpers/initializeDb'
import resetDb from '../helpers/resetDb'

const request = supertest(app)
let token: string;

describe('User Routes Suite', () => {
    beforeAll(async () => {
        createTestDb();
        const user = await request.post('/api/users/create').send({
            first_name: 'authUser',
            last_name: 'test',
            username: 'test123',
            password_digest: '123',
            email: 'test@gmail.com'});
            token = user.body;
    })
    afterAll(() => {
        resetDb();
    })
    it('/api/users/create should create a new user and return jwt token', async () => {
        const test = {
            first_name: 'user1',
            last_name: 'user2',
            username: 'testUser',
            password_digest: 'asd123',
            email: 'test@gmail.com'
        }
        const response = await request.post('/api/users/create').send(test);
        expect(response.status).toBe(201);
        //check for jwt token
        expect(response.body.split('.').length).toEqual(3);
    })
    it('/api/users/login should login to the user successfully', async () => {
        const test = {
            username: 'testUser',
            password_digest: 'asd123'
        }
        const response = await request.post('/api/users/login').send(test);
        expect(response.status).toBe(201)
        expect(response.body).toBeDefined()
    })
    it('/api/users/create should return error for not providing password', async () => {
        const test = {
            first_name: 'user1',
            last_name: 'user2',
            username: 'testUser',
        }
        const response = await request.post('/api/users/create').send(test);
        expect(response.status).toBe(400);
        expect(response.body).toEqual('Please Provide a username and password');
    })
    it('/api/users should return all users', async () => {
        const response = await request.get('/api/users').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    })
    it('/api/users/:id should return the user', async () => {
        const response = await request.get('/api/users/2').set('Authorization', `Bearer ${token}`);
        delete response.body.password_digest;
        expect(response.status).toBe(200);
        expect(response.body).toEqual({id: 2, first_name: 'user1', last_name: 'user2', username: 'testUser', email: 'test@gmail.com'});
    })
    it('/api/users/:id should edit the user', async () => {
        const test = {
            first_name: 'user1',
            last_name: 'user2',
            username: 'testUser',
            password_digest: '123321',
            email: 'test@gmail.com'
        }
        const response = await request.put('/api/users/2').send(test).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(201);
    })
    it('/api/users/:id should delete the user', async () => {
        const response = await request.delete('/api/users/2').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    })
    it('/api/users/login should fail to login and return null', async () => {
        const test = {
            username: 'asdqweqwe',
            password_digest: '41243212dasd'
        }
        const response = await request.post('/api/users/login').send(test);
        expect(response.status).toBe(400)
        expect(response.body.user).toBeUndefined()
        expect(response.body).toEqual('No user found');
    })
    
})