import { User, UserStore } from "../../models/user";
import createTestDb from "../helpers/initializeDb";
import resetDb from "../helpers/resetDb";

const store = new UserStore();

describe('User Model Suite', () => {
    beforeAll(() => {
        createTestDb();
    })
    afterAll(() => {
        resetDb();
    })
    it('Expects store.createUser(u) to create a new user', async () => {
        const result = await store.createUser({first_name: 'hussain', last_name: 'qurain', username: 'rayleigh50', password_digest: 'test123', email: 'test@gmail.com'});
        expect(result.username).toEqual('rayleigh50');
    })
    it('Expects store.indexUsers to return users', async () => {
        const result = await store.indexUsers();
        expect(result.length).toBeGreaterThanOrEqual(1);
    })
    it('Expects store.editUser to update user', async () => {
        const users = await store.indexUsers();
        const userId = users[0].id;
        const result = await store.editUser({
            id: userId,
            first_name: "ray",
            last_name: "qurain",
            username: "rayleigh50",
            password_digest: "test1233",
            email: "test@gmail.com"
        });
        expect(result.first_name).toEqual('ray');
    })
    it('Expects store.showUser to return user', async () => {
        const users = await store.indexUsers();
        const userId = users[0].id;
        const result = await store.showUser(userId ? userId : 1);
        expect(result.first_name).toEqual('ray');
    })
    it('Expects store.authenticate to return user', async () => {
        const users = await store.indexUsers();
        const pass = users[0].password_digest;
        const result = await store.authenticate('rayleigh50', 'test1233')
        expect(result?.password_digest).toEqual(pass);
    })
    it('Expects store.deleteUser to delete the user', async () => {
        let users = await store.indexUsers();
        const userId = users[0].id;
        const length_before = users.length;
        const result = await store.deleteUser(userId ? userId : 1);
        users = await store.indexUsers();
        expect(users.length).toEqual(length_before-1);
        
    })
})