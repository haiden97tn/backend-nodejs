import express from 'express';
import { newById, create, list, remove, update, read } from '../controllers/news';

const route = express.Router();

route.get('/new', (req, res) => {
    res.json({id: 'Day la news' })
});
route.post('/new', create);
route.get('/new/:newId', read);
route.delete('/new/:newId', remove);
route.get('/news', list);
route.put('/new/:newId', update);


route.param('newId', newById);

module.exports = route;


