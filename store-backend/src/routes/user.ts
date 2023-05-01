import { Router } from "express";
import { UserHandler } from "../handlers/users";
import verifyToken from "../middleware/authorization";

const UserRouter = Router();
const Handler = new UserHandler();

UserRouter.get('/', verifyToken, Handler.index);
UserRouter.get('/:id', verifyToken, Handler.show);
UserRouter.post('/create', Handler.create);
UserRouter.post('/login', Handler.authenticate);
UserRouter.put('/:id', verifyToken, Handler.update);
UserRouter.delete('/:id', verifyToken, Handler.destroy);

export default UserRouter;