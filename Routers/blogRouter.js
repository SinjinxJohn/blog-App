
const express = require('express');
const {addBlog} = require('../controllers/blogController');
// const authRouter = require('./userRouter');
// const upload = require('../controllers/blogController');
const blogRouter = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
      const fileName= `${Date.now()}-${file.originalname}`
      cb(null,fileName);
    }
  })

blogRouter.use(express.json());

const upload = multer({ storage: storage });
blogRouter.post('/blog',upload.single("coverImage"),addBlog);

module.exports = blogRouter;