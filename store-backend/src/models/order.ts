// @ts-ignore
import client from "../database";

export type Order = {
    id?: number;
    status: string;
    user_id: number;
}

export type OrderProducts = {
    id?: number;
    quantity: number;
    order_id: string;
    product_id: string;
}

export class OrderStore {
    // Orders
    async indexOrders(userId: number): Promise<Order[]> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1)';
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows;
        }
        catch (err){
            throw new Error(`Could not get orders: ${err}`);
        }
    }
    async showOrder(userId: number): Promise<Order> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status = \'active\' ORDER BY id LIMIT 1';
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows[0];

        }
        catch (err){
            throw new Error(`Could not get the specified order: ${err}`);
        }
    }
    async createOrder(o: Order): Promise<Order> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *';
            const result = await conn.query(sql, [o.status, o.user_id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create order ${o}: ${err}`);
        }
    }
    async editOrder(o: Order): Promise<Order> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'UPDATE orders SET status = ($2), user_id = ($3) WHERE id = ($1) RETURNING *';
            const result = await conn.query(sql, [o.id, o.status, o.user_id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not update order ${o}: ${err}`);
        }
    }
    async deleteOrder(id: number): Promise<Order> {
        try{
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'DELETE FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not delete order: ${err}`);
        }
    }
    // Order Products
    async addProductToOrder(quantity: number, orderId: string, productId: string): Promise<OrderProducts[]> {
        try{
            // @ts-ignore
            const conn = await client.connect();
            
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3)';
            await conn.query(sql, [quantity, orderId, productId]);

            const selectSql = 'SELECT * FROM order_products WHERE order_id = ($1)';
            const result = await conn.query(selectSql, [orderId]);
            const order = result.rows;

            conn.release()
            return order
        }
        catch (err){
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
    }
    async showOrderProducts(orderId: string): Promise<OrderProducts[]> {
        try{
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM order_products WHERE order_id = ($1) ORDER BY id ASC';
            const result = await conn.query(sql, [orderId]);
            conn.release();
            return result.rows;
        }
        catch (err){
            throw new Error(`Could not get order products: ${err}`);
        }
    }
    async removeProductfromOrder(orderId: string, productId: string): Promise<OrderProducts> {
        try{
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'DELETE FROM order_products WHERE order_id = ($1) AND product_id = ($2)';
            const result = await conn.query(sql, [orderId, productId]);
            conn.release();
            return result.rows[0];
        }
        catch (err){
            throw new Error(`Could not delete product ${productId} from order ${orderId}: ${err}`);
        }
    }
    async deleteOrderProducts(orderId: string): Promise<OrderProducts> {
        try{
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'DELETE FROM order_products WHERE order_id = ($1)';
            const result = await conn.query(sql, [orderId]);
            conn.release();
            return result.rows[0];
        }
        catch (err){
            throw new Error(`Could not delete order products: ${err}`);
        }
    }
    async updateOrderProductQuantity(quantity: number, orderId: string, productId: string): Promise<OrderProducts> {
        try{
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'UPDATE order_products SET quantity = ($1) WHERE order_id = ($2) AND product_id = ($3) RETURNING *';
            const result = await conn.query(sql, [quantity, orderId, productId]);
            conn.release();
            return result.rows[0];
        }
        catch (err){
            throw new Error(`Could not update order product quantity: ${err}`);
        }
    }

}