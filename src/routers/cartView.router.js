import { Router } from 'express';
import cartModel from '../models/cart.model.js';

const router = Router();

router.get('/:cid', async (req, res) => {
    const cart = await cartModel.findById(req.params.cid);
    res.render('cart', cart );
});

export default router;