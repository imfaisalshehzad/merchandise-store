import {Router} from 'express';
import listProduct from "../controllers/product/list";
import createProduct from "../controllers/product/create";
import updateProduct from "../controllers/product/update";
import deleteProduct from "../controllers/product/delete";
import getProduct from "../controllers/product/get";


const router = Router();

router.get('/products', listProduct);
router.get('/products/:id', getProduct);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;