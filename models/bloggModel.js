const mongoose = require('mongoose');
const db_link = "mongodb+srv://sinjinhotlinebling:hotlinebling@cluster0.rgyeyal.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(db_link)
    .then(function (db) {
        console.log("db connected");
    })
    .catch(function (err) {
        console.log(err);
    })


const blogSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    coverImage:{
        type:String,
        // required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel",

    }

},
{timestamps:true});


const blogModel = mongoose.model('blog',blogSchema);
module.exports =blogModel;