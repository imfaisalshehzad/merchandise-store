import {Request, Response} from "express";
import {readProductData} from "./service/productService";

const getProduct = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const productData = await readProductData();
        const index = productData.findIndex((item) => item.id === parseInt(id));

        if (index !== -1) {
            res.json(productData[index]);
        } else {
            res.status(404).json({message: 'Product not found'});
        }
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
};

export default getProduct;