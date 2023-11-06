const userModel = require('../models/userModel');

module.exports.signup = async function(req,res){
    try{
        const {fullName,email,password,confirmpassword} = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const existingUser = await userModel.findOne({ email:email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        

       const user= await userModel.create({
            fullName,
            email,
            password,
            confirmpassword
        })
        if(user){
            return res.json(user);
        };

    }catch(error){
        res.json({
            message:error.message,
        })
    }
}
module.exports.signin = async function(req, res) {
    const { email, password } = req.body;

    try {
        const token = await userModel.matchPassword(email, password);

        // If the password matches, you can return a success response or perform additional actions.
        // For example, you can generate a token for authentication and send it back in the response.

        // Return a success response with a token or other information.
        res.cookie('token', token, { httpOnly: true });
        
        res.status(200).json({ message: 'Signin successful',token  });
    } catch (error) {
        // If the password does not match or the user is not found, return an error response.
        res.status(401).json({ message: 'Signin failed', error: error.message });
    }
};

module.exports.logout=async function(req,res){
    res.clearCookie('token');
    res.json({
        message:"Logged Out Successfully"
    })
}


