const express = require('express');
const app = express();
const blogRouter = require('./routers/blogRouter');
const userRouter = require('./routers/userRouter');
const cookieParser = require('cookie-parser');
const { checkforAuthCookie } = require('./middlewares/authHelper');

app.use(express.json());
app.use(cookieParser());

app.use(checkforAuthCookie("token"));

// Base paths for user and blog routers
app.use('/users', userRouter);
app.use('/blogs', blogRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
