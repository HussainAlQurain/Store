// @ts-ignore
import client from "../database";
import bcrypt from "bcrypt";
export type User = {
    id?: number;
    first_name: string;
    last_name: string;
    username: string;
    password_digest?: string;
    email: string
}

export class UserStore {
    async indexUsers(): Promise<User[]> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err){
            throw new Error(`Could not get users: ${err}`);
        }
    }
    async showUser(id: number): Promise<User> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM users where id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];

        }
        catch (err){
            throw new Error(`Could not get the specified user: ${err}`);
        }
    }
    async createUser(u: User): Promise<User> {
        try {
            const pepper: string = process.env.BCRYPT_PASSWORD as string;
            const saltRounds: string = process.env.SALT_ROUNDS as string;
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'INSERT INTO users (first_name, last_name, username, password_digest, email) VALUES ($1, $2, $3, $4, $5) RETURNING *';
            const hash = bcrypt.hashSync(
                u.password_digest + pepper, 
                parseInt(saltRounds)
             );
            const result = await conn.query(sql, [u.first_name, u.last_name, u.username, hash, u.email]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create user ${u}: ${err}`);
        }
    }
    async editUser(u: User): Promise<User> {
        try {
            const pepper: string = process.env.BCRYPT_PASSWORD as string;
            const saltRounds: string = process.env.SALT_ROUNDS as string;
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'UPDATE users SET first_name = ($2), last_name = ($3), username = ($4), password_digest = ($5) WHERE id = ($1) RETURNING *';
            const hash = bcrypt.hashSync(
                u.password_digest + pepper, 
                parseInt(saltRounds)
             );
            const result = await conn.query(sql, [u.id, u.first_name, u.last_name, u.username, hash]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not update user ${u}: ${err}`);
        }
    }
    async deleteUser(id: number): Promise<User> {
        try{
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'DELETE FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not delete user: ${err}`);
        }
    }
    async authenticate(username: string, password: string): Promise<User|null> {
        // @ts-ignore
        const conn = await client.connect();
        const sql = 'SELECT id, password_digest FROM users where username=($1)';
        const result = await conn.query(sql, [username]);
        if(result.rows.length) {
            const user = result.rows[0];

            if(bcrypt.compareSync(password+process.env.BCRYPT_PASSWORD, user.password_digest)){
                return user
            }
        }
        return null
    }

}