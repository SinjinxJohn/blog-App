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

module.exports.getAllBlogs = async function (req, res){
    try {
        // Retrieve all blogs from the database
        const blogs = await blogModel.find({createdBy:req.user._id});
        console.log(blogs);

        // Return a 200 response with the array of blogs
        return res.status(200).json({
           data:blogs
        });
    } catch (error) {
        // If an error occurs during the database query or processing, handle it here
        console.error(error);
        // Return a 500 response with an error message
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};



// const upload = multer({ storage: storage });
// module.exports=upload;