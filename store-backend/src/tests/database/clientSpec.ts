// @ts-ignore
import client from '../../database';

describe('Database Connection', () => {
  it('should connect to the database', async () => {
    // @ts-ignore
    const conn = await client.connect();
    expect(conn).not.toBeNull();
    conn.release();
  });  
});