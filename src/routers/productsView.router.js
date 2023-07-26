import { Router } from 'express';
import productModel from '../models/products.model.js';

const router = Router();

router.get('/', async (req, res) => {
    const products = await productModel.paginate({}, { page: req.query.page || 1, limit: 10, lean: true});
    
    products.prevLink = `/products?page=${products.prevPage}`;
    products.nextLink = `/products?page=${products.nextPage}`;

    res.render('products', products );
});

export default router;