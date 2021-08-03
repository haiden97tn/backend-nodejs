import express from 'express';
const router = express.Router();

import { userById, read, update, list, remove } from '../controllers/user';
import { requireSignin, isAdmin, isAuth } from "../controllers/auth"

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
})

router.get('/user/:userId', requireSignin, read);
router.put('/user/:userId', update)
router.delete('/user/:userId', remove);

router.param('userId', userById);

router.get('/user', list);


module.exports = router;