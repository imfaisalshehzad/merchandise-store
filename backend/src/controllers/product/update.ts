import {Request, Response} from "express";
import {readProductData, writeProductData} from "./service/productService";
import {productUpdateFormSchema} from "../../schema/productSchema";

const updateProduct = async (req: Request, res: Response) => {
    try {
        const validation = productUpdateFormSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({error: validation.error});
        }

        const {id} = req.params;
        const {name, price} = req.body;

        const productData = await readProductData();
        const index = productData.findIndex((item) => item.id === parseInt(id));

        if (index !== -1) {
            productData[index].name = name || productData[index].name;
            productData[index].price = price || productData[index].price;
            productData[index].updatedAt = new Date().toISOString();

            await writeProductData(productData);
            res.json(productData[index]);
        } else {
            res.status(404).json({message: 'Product not found'});
        }
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
};

export default updateProduct;