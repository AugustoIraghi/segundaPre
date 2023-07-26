import { Router } from 'express';
import productsModel from '../models/products.model.js';

const router = Router();

router.get('/', async (req, res) => {
    try{
        const products = await productsModel.find();
        res.json({ products: products });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:pid', async (req, res) => {
    try{
        const product = await productsModel.findById(req.params.pid);
        res.json( {product:  product } );
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try{
        const { title, description, brand, price, stock, category, thumbnails } = req.body;
        if (!title || !description || !brand || !price || !stock || !category) return res.status(400).json({ message: 'Some fields are missing' });
        const product = new productsModel({ title, description, brand, price, stock, category, thumbnails });
        await product.save();
        res.status(201).json({ message: 'Product added successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:pid', async (req, res) => {
    try{
        const newData = req.body;
        const successfully = await productsModel.findByIdAndUpdate(req.params.pid, newData);
        // successfully ? res.status(200).json({ message: 'Product updated successfully' }) : res.status(400).json({ message: 'Product not found' });
        res.json( {message: successfully} )
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:pid', async (req, res) => {
    try{
        const successfully = await productsModel.findByIdAndDelete(req.params.pid);
        // successfully ? res.status(200).json({ message: 'Product deleted successfully' }) : res.status(400).json({ message: 'Product not found' });
        res.json( {message: successfully} )
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;