import {Request, Response} from "express";
import {ProductTypes} from "../../types/product.types";
import {readProductData, writeProductData} from "./service/productService";
import {v4 as uuidv4} from 'uuid';
import {productCreateFormSchema} from "../../schema/productSchema";

const createProduct = async (req: Request, res: Response) => {
    try {
        const validation = productCreateFormSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({error: validation.error});
        }

        const {name, price} = req.body;
        const productData = await readProductData();


        const product: ProductTypes = {
            id: productData.length + 1,
            name,
            price,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        productData.push(product);
        await writeProductData(productData);

        res.json(product);
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
};

export default createProduct;