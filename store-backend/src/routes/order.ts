import { Router } from "express";
import { OrderHandler } from "../handlers/order";
import verifyToken from "../middleware/authorization";
const OrderRouter = Router();
const Handler = new OrderHandler();

OrderRouter.use(verifyToken);
//order
OrderRouter.get('/user_id/:user_id', Handler.index);
OrderRouter.get('/:id', Handler.show);
OrderRouter.post('/create', Handler.create);
OrderRouter.put('/:id', Handler.update);
OrderRouter.delete('/:id', Handler.destroy);
//order products
OrderRouter.post('/:orderId/products', Handler.addProductToOrder);
OrderRouter.get('/:orderId/products', Handler.showOrderProducts);
OrderRouter.delete('/:orderId/products/:productId', Handler.removeProductfromOrder);
OrderRouter.delete('/order/orderId', Handler.deleteOrderProducts);
OrderRouter.put('/:orderId/products/:productId', Handler.updateOrderProduct)

export default OrderRouter;