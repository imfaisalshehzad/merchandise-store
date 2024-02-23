import {Request, Response} from "express";
import {readProductData, writeProductData} from "./service/productService";

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const productData = await readProductData();
        const updatedProductData = productData.filter((item) => item.id !== parseInt(id));

        if (productData.length !== updatedProductData.length) {
            await writeProductData(updatedProductData);
            res.json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default deleteProduct;