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


route.post('/product', create);
route.put('/product/:productId', update);
route.delete('/product/:productId', remove);

route.get('/product/:productId', read);
route.get('/products', list);




route.param('productId', productById);
route.param('userId', userById)

module.exports = route;
