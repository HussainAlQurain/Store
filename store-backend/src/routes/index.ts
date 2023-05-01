import express from "express";
import UserRouter from "./user";
import OrderRouter from "./order";
import ProductRouter from "./product";

const routes = express.Router();

routes.get('/', (req: express.Request, res: express.Response): void => {
    res.status(200).send('Welcome to my Store');
});

routes.use('/users', UserRouter);
routes.use('/products', ProductRouter);
routes.use('/orders', OrderRouter);

export default routes;