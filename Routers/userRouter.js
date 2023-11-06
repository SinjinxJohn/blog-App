const express = require('express');
const {signup,signin,logout} = require('../controllers/userController');
const authRouter = express.Router();

authRouter.use(express.json());

authRouter.post('/signup',signup);
authRouter.post('/login',signin);
authRouter.get('/logout',logout);
module.exports=authRouter;