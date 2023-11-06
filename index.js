const express = require('express');
const app = express();
const blogRouter = require('./Routers/blogRouter')
const userRouter = require('./Routers/userRouter');
var cookieParser = require('cookie-parser');
const {checkforAuthCookie}=require('./middlewares/authHelper');

app.use(express.json());
app.use(cookieParser());

app.use(checkforAuthCookie("token"));
app.use('/',userRouter);
app.use('/',blogRouter);
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
});

app.listen(3000);