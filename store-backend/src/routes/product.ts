import { Router } from "express";
import { ProductHandler } from "../handlers/product";
import verifyToken from "../middleware/authorization";
const ProductRouter = Router();
const Handler = new ProductHandler();

ProductRouter.get('/', Handler.index);
ProductRouter.get('/:id', Handler.show);
ProductRouter.post('/create', verifyToken, Handler.create);
ProductRouter.put('/:id', verifyToken, Handler.update);
ProductRouter.delete('/:id', verifyToken, Handler.destroy);

export default ProductRouter;