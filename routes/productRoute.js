import express from 'express';
import { isAdmin, isAuth, requireSignin } from '../controllers/auth';
import { userById } from '../controllers/user';
import { create, productById, read, remove, list, update, listMan, listWoman, image } from './../controllers/product';
const route = express.Router();


route.get('/product', (req, res) => {
    res.json({ id: 'Day la noi dung' })
});
route.get('/products/man', listMan);
route.get('/products/woman', listWoman);

route.post('/product/:userId', requireSignin, isAuth, isAdmin, create);
route.get('/product/:productId', read);
route.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove);
route.get('/products', list);
route.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, update);

route.param('productId', productById);
route.param('userId', userById)

module.exports = route;
