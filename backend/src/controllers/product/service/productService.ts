import fs from 'fs/promises';
import {ProductTypes} from "../../../types/product.types";
import path from "path";

const PRODUCTS_FILE_PATH = path.join(process.cwd(), "/src/product.json");

export const readProductData = async (): Promise<ProductTypes[]> => {
    const data = await fs.readFile(PRODUCTS_FILE_PATH, 'utf-8');
    return JSON.parse(data);
};

export const writeProductData = async (product: ProductTypes[]): Promise<void> => {
    await fs.writeFile(PRODUCTS_FILE_PATH, JSON.stringify(product, null, 2));
};
