import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const ENV = process.env.ENV;
const POSTGRES_HOST = process.env.POSTGRES_HOST;
const POSTGRES_DB = process.env.POSTGRES_DB;
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const POSTGRES_TEST_DB = process.env.POSTGRES_TEST_DB;


let client
//this is to see if my ENV variable has extra space or not.
console.log(JSON.stringify(ENV));

if(ENV === 'test') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  })
}

if(ENV === 'dev') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  })
}

if(ENV !== 'dev' && ENV !== 'test'){
  throw new Error(`Unknown environment`);
}

export default client