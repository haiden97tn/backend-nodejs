import express from 'express';
import { create, productById, read, remove, list, update, listMan, listWoman, image } from './../controllers/product';
const route = express.Router();


route.get('/product',(req, res) => {
    res.json({id : 'Day la noi dung'})
});
route.get('/products/man', listMan);
route.get('/products/woman', listWoman);

route.post('/product',create);
route.get('/product/:productId', read);
route.delete('/product/:productId', remove);
route.get('/products', list);
route.put('/product/:productId', update);

// route.get("/product/image/:productId", image)


route.param('productId', productById);

module.exports = route; 
