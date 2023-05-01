import { Router, Response, Request } from "express";
import { Order, OrderStore } from "../models/order";


const store = new OrderStore();

export class OrderHandler {
    async index(req: Request, res: Response) {
        try{
            const order = await store.indexOrders(parseInt(req.params.user_id));
            res.status(200).json(order);
        }
        catch (err){
            res.status(500).json(err);
        }
    }
    async show(req: Request, res: Response) {
        try{
            const order = await store.showOrder(parseInt(req.params.id));
            if(order){
                res.status(200).json(order);
            } else{
                res.status(404).json('order not found');
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    async create(req: Request, res: Response) {
        try{
            const order = await store.createOrder(req.body);
            res.status(201).json(order);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    async update(req: Request, res: Response){
        try{
            const order = await store.editOrder({id: parseInt(req.params.id), status: req.body.status, user_id: parseInt(req.body.user_id)});
            res.status(201).json(order);

        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    async destroy(req: Request, res:Response) {
        try{
            const order = await store.deleteOrder(parseInt(req.params.id));
            res.status(200).json({status: `Deleted ${order}`});
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    async addProductToOrder(req: Request, res: Response){
        try{
            const product = await store.addProductToOrder(req.body.quantity, req.params.orderId, req.body.productId);
            res.status(201).json(product);
        }
        catch (err){
            res.status(400).json(err);
        }
    }
    async showOrderProducts(req: Request, res: Response){
        try{
            const order = await store.showOrderProducts(req.params.orderId);
            res.status(200).json(order);
        }
        catch (err){
            res.status(400).json(err);
        }
    }
    async removeProductfromOrder(req: Request, res: Response){
        try{
            const order = await store.removeProductfromOrder(req.params.orderId, req.params.productId);
            res.status(200).json(order);
        }
        catch (err){
            res.status(400).json(err);
        }
    }
    async deleteOrderProducts(req: Request, res: Response){
        try{
            const order = await store.deleteOrderProducts(req.body.orderId);
            res.status(200).json(order);
        }
        catch (err){
            res.status(400).json(err);
        }
    }
    async updateOrderProduct(req: Request, res: Response){
        try{
            const order = await store.updateOrderProductQuantity(req.body.quantity, req.params.orderId, req.params.productId);
            res.status(201).json(order);
        }
        catch (err){
            res.status(400).json(err);
        }
    }
}