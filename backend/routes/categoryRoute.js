import express from 'express';
import { categoryById, create, list, remove, update, read } from '../controllers/category';

const route = express.Router();

route.get('/category', (req, res) => {
    res.json({id: 'Day la cate' })
});
route.post('/category', create);
route.get('/category/:categoryId', read);
route.delete('/category/:categoryId', remove);
route.get('/categorys', list);
route.put('/category/:categoryId', update);


route.param('categoryId', categoryById);

module.exports = route;


