import { Router } from 'express';
import userModel from '../models/users.model.js';
import cartModel from '../models/cart.model.js';

const router = Router();

router.post('/in', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Some fields are missing' });
    try{
        const userFromDb = await userModel.findOne({ email, password });
        if (!userFromDb) return res.status(401).json({ message: 'User not found' });
        delete userFromDb.password;
        req.session.user = userFromDb;
        res.json({ message: 'User logged in successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/out', (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: 'User logged out successfully' });
});

router.post('/register', async (req, res) => {
    const { email, password, first_name, last_name } = req.body;
    if (!email || !password || !first_name || !last_name) return res.status(400).json({ message: 'Some fields are missing' });
    if (await userModel.findOne({ email: email })) return res.status(400).json({ message: 'User already exists' });
    if (password.length < 6) return res.status(400).json({ message: 'Password too short' });
    try {
        // const cart = new cartModel();
        // await cart.save();
        const cart = await cartModel.create();
        console.log(cart);
        const newUser = new userModel({ email, password, first_name, last_name, cart: cart._cid });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;