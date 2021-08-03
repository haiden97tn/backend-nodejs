import express from 'express';
const router = express.Router();
// import { userSignupValidator } from "../validator";

import { signin, signup, singout } from "../controllers/auth";

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', singout);

module.exports = router;