# Storefront Backend Project
This is a backend API built with Nodejs for an online store.
RESTful API will be exposed to be used by the frontend developers.

Information about the routes will be shown in REQUIREMENT.md.
## Installation Instructions

Run the following command to install all required libraries:
- yarn install

Connect to the default postgres database as the server's root user psql -h 127.0.0.1 -U hussain postgres.

Create a new user by:
- CREATE USER hussain WITH PASSWORD 'password123';

Create Two databases:
- CREATE DATABASE full_stack_dev;
- CREATE DATABASE full_stack_dev_test;

Connect to each database and grant privileges to the user:
- \c full_stack_dev
- GRANT ALL PRIVILEGES ON DATABASE full_stack_dev to hussain;
- \c full_stack_dev_test
- GRANT ALL PRIVILEGES ON DATABASE full_stack_dev_test to hussain;
    
install dotenv (yarn add dotenv), and setup .env file to contain the following details:
- POSTGRES_HOST=127.0.0.1
- POSTGRES_DB=full_stack_dev
- POSTGRES_TEST_DB=full_stack_dev_test
- POSTGRES_USER=hussain
- POSTGRES_PASSWORD=password123!
- ENV=dev
- BCRYPT_PASSWORD=secret-pass
- SALT_ROUNDS=10
- TOKEN_SECRET=asdfqwemio

#### Ports
- The app runs on port 3000.
- The database runs on 5432.


Run the tests by:
- yarn test

Run the migrations by:
db-migrate up

Run the server by:
- yarn watch


