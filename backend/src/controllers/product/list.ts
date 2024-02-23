import {Request, Response} from "express";
import {readProductData} from "./service/productService";

const listProduct = async (req: Request, res: Response) => {
    try {
        const products = await readProductData();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default listProduct;