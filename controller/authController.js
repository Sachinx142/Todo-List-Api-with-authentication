const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken  = require('../utils/generateToken')

const register = async (req,res) => {
    const {name,email,password,role} = req.body;

    try {
        const userExits = await User.findOne({email});

        if (userExits) return res.status(400).json({ message: 'User exists' });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password,salt)

        const user = await User.create({name,email,role:role || 'user',password:hash})
        res.status(201).json({message:"User Created Successfully",token:generateToken(user)})
    } catch (error) {
       res.status(500).json({message:'Server Error'})   
       console.log(error)
    }
}

const login = async (req,res) => {
    const {email,password} = req.body;

    try {
        const user = await User.findOne({email})

        if(!user)  return res.status(400).json({ message: 'Invalid email' });

        const isMatch = await  bcrypt.compare(password, user.password);
        if(!isMatch) return  res.status(400).json({ message: 'Wrong password' });

        // Check the user's role
        if(user.role === 'admin'){
            return res.status(200).json({
                message:"Admin Login Successfully", 
                token:generateToken(user)
            });
        }
        // Check the admin's role
        else if(user.role === 'user'){
            return res.status(200).json({
                message: "User Login Successfully",
                token: generateToken(user),
            });
        }
        else{
            return res.status(403).json({ message: 'Unauthorized role' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    register:register,
    login:login
}