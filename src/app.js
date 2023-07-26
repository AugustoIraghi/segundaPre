import express from 'express';
import handlebars from 'express-handlebars';
import productsRouter from './routers/products.router.js';
import cartsRouter from './routers/carts.router.js';
import mongoose from 'mongoose';
import cartViewRouter from './routers/cartView.router.js';
import productsViewRouter from './routers/productsView.router.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import log from './routers/log.router.js';
import logView from './routers/logView.router.js';

const app = express();

app.use(express.json());
app.use(express.static("./public"));

app.use(session({
    store: MongoStore.create({ 
        mongoUrl: 'mongodb+srv://admin:admin@augustodb.fxwg1iy.mongodb.net/',
        dbName: 'segundaPre'
    }),
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');

const uri = 'mongodb+srv://admin:admin@augustodb.fxwg1iy.mongodb.net/'

const auth = (req, res, next) => {
    const user = req.session.user;
    console.log(user);
    if (!user){
        console.log('no hay user');
        res.redirect(301, '/log/in');
    }
    next();
}

const admin = (req, res, next) => {
    const user = req.session.user;
    if (!user || user.role != 'admin') return res.status(403).json({ message: 'User not authorized' });
    next();
}


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/log', log);
app.use('/products', auth, productsViewRouter);
app.use('/carts', auth, cartViewRouter);
app.use('/log', logView);

app.get('/', (req, res) => {
    res.redirect(301, '/products');
});

try {
    await mongoose.connect(uri, { dbName: 'segundaPre' })
    app.listen(8080, () => console.log('Server running on 8080'));
} catch (err) {
    console.log(err.message);
}