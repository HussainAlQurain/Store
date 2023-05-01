import supertest from 'supertest'
import app from '../../server'
import createTestDb from '../helpers/initializeDb'
import resetDb from '../helpers/resetDb'

const request = supertest(app)
let token: string;

describe('Order Routes Suite', () => {
    beforeAll(async () => {
        resetDb();
        createTestDb();
        const user = await request.post('/api/users/create').send({
        first_name: 'user1',
        last_name: 'user2',
        username: 'testUser',
        password_digest: 'asd123'});
        token = user.body;
    });
    afterAll(() => {
        resetDb();
    })
    it('1-api/orders/create should return a newly created order', async () => {
        const test = {
            status: 'active',
            user_id: 1
        }
        const response = await request.post('/api/orders/create').set('Authorization', `Bearer ${token}`).send(test);
        expect(response.status).toBe(201);
        expect(response.body).toEqual({id: 1, status: 'active', user_id: '1'});
    })
    it('2-api/orders should return all orders', async () => {
        const response = await request.get('/api/orders/user_id/1').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    })
    it('3-api/orders/:id should return the order', async () => {
        const response = await request.get('/api/orders/1').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    })
    it('4-/api/orders/:id/products should return the products within an order', async () => {
        const orderP = {
            quantity: 5,
            productId: '1'
        }
        const p = {
            name: 'coffee',
            price: 5,
            url: '',
            description: ''
        }
        const product = await request.post('/api/products/create').set('Authorization', `Bearer ${token}`).send(p);

        const response = await request.post('/api/orders/1/products').send(orderP).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(201);
    })
    it('5-api/orders:orderId/products/:productId should update the quantity of a product in an order', async () => {
        const quantity = 10;
        const response = await request.put('/api/orders/1/products/1').send({quantity}).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(201);
    })
    it('6-api/orders/:id should edit the orders', async () => {
        const test = {
            status: 'complete',
            user_id: 1,
        }
        const response = await request.put('/api/orders/1').set('Authorization', `Bearer ${token}`).send(test);
        expect(response.status).toBe(201);
    })
    it('7-api/orders/order/orderid should delete complete order products', async () => {
        const products = await request.get('/api/orders/1/products').set('Authorization', `Bearer ${token}`);
        const response = await request.delete('/api/orders/order/orderid').send({orderId: 1}).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
      });
    it('8-api/orders/:id should delete the order', async () => {
        const response = await request.delete('/api/orders/1').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    })
})