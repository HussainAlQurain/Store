# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index '/api/products/' [GET]
- Show '/api/products/:id' [GET]
- Create [token required] '/api/products/create' [POST]
- Update [token required] '/api/products/:id' [PUT]
- Delete [token required] '/api/products/:id' [DELETE]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required] '/api/users' [GET]
- Show [token required] '/api/users/:id' [GET]
- Create returns token '/api/users/create' [POST]
- Login returns token '/api/users/login' [POST]
- Update [token required] 'api/users/:id' [PUT]
- Delete [token required] 'api/users/:id' [DELETE]

#### Orders
- Order by user (args: user id)[token required] '/api/orders/user_id/:user_id' [GET]
- Current order by user (args: user id) [token required] '/api/orders/:id' [GET]
- Update [token required] '/api/orders/:id' [PUT]
- Delete [token required] '/api/orders/:id' [DELETE]
- Product to order (args: quantity, orderId, productId) [token required] '/api/orders/:id/products' [POST]

## Data Shapes
#### Product
-  id
- name
- price
``` sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name varchar(100) NOT NULL,
    price integer NOT NULL
);
```
#### User
- id
- first_name
- last_name
- username
- password_digest
``` sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    username varchar(30) NOT NULL,
    password_digest varchar
);
```
#### Orders
- id
- status (active or complete)
- user_id
``` sql
CREATE TABLE orders (
id SERIAL PRIMARY KEY,
status varchar(20),
user_id bigint REFERENCES users(id)
);
```

#### order_products
- id
- quantity
- order_id
- product_id

``` sql
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);
```