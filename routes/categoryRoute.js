import express from 'express';
import { isAdmin, isAuth, requireSignin } from '../controllers/auth';
import {userById} from '../controllers/user';
import { categoryById, create, list, remove, update, read } from '../controllers/category';

const route = express.Router();

route.get('/category', (req, res) => {
    res.json({id: 'Day la cate' })
});
route.post('/category/:userId',requireSignin,isAuth,isAdmin,create);
route.get('/category/:categoryId', read);
route.delete('/category/:categoryId', remove);
route.get('/categorys', list);
route.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, update);


route.param('categoryId', categoryById);
route.param('userId', userById)


module.exports = route;


