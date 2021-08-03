import express from 'express';
import { isAdmin, isAuth, requireSignin } from '../controllers/auth';
import { userById } from '../controllers/user';
import { create, read, remove, list, cartById, update } from './../controllers/cart';
const route = express.Router();


route.get('/cart', (req, res) => {
    res.json({ id: 'Day la cart' })
});


route.post('/cart', create);
route.delete('/cart/:cartId/:userId', requireSignin, isAuth, isAdmin, remove);
route.get('/cart/:cartId', read);
route.get('/carts', list);
route.put('/cart/:cartId', update);




route.param('cartId', cartById);
route.param('userId', userById)

module.exports = route;
