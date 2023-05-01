// @ts-ignore
import client from "../database";

export type Product = {
    id?: number;
    name: string;
    price: number;
    url?: string;
    description?: string;
}

export class ProductStore {
    async indexProducts(): Promise<Product[]> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err){
            throw new Error(`Could not get products: ${err}`);
        }
    }
    async showProduct(id: number): Promise<Product> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM products where id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];

        }
        catch (err){
            throw new Error(`Could not get the specified product: ${err}`);
        }
    }
    async createProduct(p: Product): Promise<Product> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'INSERT INTO products (name, price, url, description) VALUES ($1, $2, $3, $4) RETURNING *';
            const result = await conn.query(sql, [p.name, p.price, p.url, p.description]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create product ${p}: ${err}`);
        }
    }
    async editProduct(p: Product): Promise<Product> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'UPDATE products SET name = ($2), price = ($3), url = ($4), description = ($5) WHERE id = ($1) RETURNING *';
            const result = await conn.query(sql, [p.id, p.name, p.price, p.url, p.description]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not update product ${p}: ${err}`);
        }
    }
    async deleteProduct(id: number): Promise<Product> {
        try{
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'DELETE FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not delete product: ${err}`);
        }
    }
}