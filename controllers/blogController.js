const blogModel = require('../models/bloggModel');

 

  module.exports.addBlog = async function (req, res) {
    const { title, body } = req.body;
    try {
        const blogData = await blogModel.create({
            body,
            title,
            createdBy: req.user._id,
            coverImage: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
        });
        res.status(201).send({
            message: "Blog Created successfully",
            data: blogData
        });
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};


// const upload = multer({ storage: storage });
// module.exports=upload;