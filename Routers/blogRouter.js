const express = require('express');
const { addBlog, getAllBlogs } = require('../controllers/blogController');
const blogRouter = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

blogRouter.use(express.json());

blogRouter
    .post('/add', upload.single("coverImage"), addBlog)
    .get('/getAll', getAllBlogs);

module.exports = blogRouter;
