import { Router, Response, Request } from "express";
import { Product, ProductStore } from "../models/product";


const store = new ProductStore();

export class ProductHandler {
    async index(req: Request, res: Response) {
        try{
            const product = await store.indexProducts();
            res.status(200).json(product);
        }
        catch (err){
            res.status(500).json(err);
        }
    }
    async show(req: Request, res: Response) {
        try{
            const product = await store.showProduct(parseInt(req.params.id));
            if(product){
                res.status(200).json(product);
            } else{
                res.status(404).json('product not found');
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    async create(req: Request, res: Response) {
        try{
            const product = await store.createProduct(req.body);
            res.status(201).json(product);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    async update(req: Request, res: Response){
        try{
            const product = await store.editProduct({id: parseInt(req.params.id), name: req.body.name, price: parseInt(req.body.price), url: req.body.url, description: req.body.description});
            res.status(201).json(product);

        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    async destroy(req: Request, res:Response) {
        try{
            const product = await store.deleteProduct(parseInt(req.params.id));
            res.status(200).json({status: `Deleted ${product}`});
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
}