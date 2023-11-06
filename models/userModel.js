const mongoose = require('mongoose');
var validator = require("email-validator");
const {createHmac, randomBytes} =  require('crypto');
const {createTokenForUser} = require('../Services/auth');
const db_link = "mongodb+srv://sinjinhotlinebling:hotlinebling@cluster0.rgyeyal.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(db_link)
    .then(function (db) {
        console.log("db connected");
    })
    .catch(function (err) {
        console.log(err);
    })

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        validate: function (value) {
            return validator.validate(value)

        }
    },
    salt: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        min: 8,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true,
        minlength: 8,

    },
    profilePic:{
        type:String,
        default:"public/images/default.png"
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER",
    }

},
    { timeStamps: true },
);

userSchema.static("matchPassword",async function (email,password){
    const user =await this.findOne({email});
    if(!user) throw new Error("User not found");

    const salt=user.salt;
    const hashedpassword = user.password;
    const userProvided = createHmac('sha256',salt).update(password).digest('hex');

    if(hashedpassword !==userProvided){
        throw new Error("Password is incorrect");
    }

    const token=createTokenForUser(user);


    return token;





})

userSchema.pre('save', function (next) {

    const user=this;
    if(!user.isModified("password")) return;
    if(this.password!==this.confirmpassword){
        throw new Error("Passwords do not match");
    }

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256',salt).update(user.password).digest('hex');
    this.salt=salt;
    this.password=hashedPassword;
    this.confirmpassword=undefined;
    next();


})

const userModel = mongoose.model('userModel',userSchema);
module.exports= userModel;