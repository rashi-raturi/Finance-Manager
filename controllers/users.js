const User = require('../models/users');
const Account = require('../models/accounts');
const jwt = require('jsonwebtoken');   // for creating web tokens
const bcrypt = require('bcrypt');      // for hashing passwords

require('dotenv').config();


const signUp = async (req,res) => {
    try {
        // need to create a form for this
        const user_email = req.body.email;
        const user_balance = req.body.balance;

        // checking if user already exists
        const user = await User.findOne({email: user_email});
        if(user){
            return res.status(400).json({msg: 'Email already exists! Please login or use a different email.'});
        }

        // else creating new user
        else{
            const user = new User(req.body);
            const savedUser = await user.save(user);

            // creating the account (bank) for the new user
            const account = new Account({
                userId: savedUser._id,
                balance: user_balance
            });
            await account.save(account);

            // creating JWT
            const JWT_KEY = process.env.JWT_KEY;
            const token = jwt.sign({ id: user._id }, JWT_KEY, { expiresIn: '1h' });

            // setting token as HTTP only cookie
            res.cookie('token', token, {httpOnly: true});

            return res.status(200).json({msg: 'Signed up successfully!'}); 
        }

    } catch (error) {
        return res.status(500).json({msg:error});
    }
}

const login = async (req,res) =>{
    try {
        // putting validation and trimming spaces here also
        const user_email = req.body.email?.trim();          
        const user_password = req.body.password?.trim();

        if(!user_email){
            return res.status(400).json({msg:'Email is required'});
        }
        else if(!user_password){
            return res.status(400).json({msg:'Password is required'});
        }
        
        // checking if the user exists
        const user = await User.findOne({email: user_email});

        if(!user){
            return res.status(404).json({msg: 'User does not exist. Please try signing up!'});
        }
        
        // matching hashed passwords
        const isMatch = await bcrypt.compare(user_password, user.password);
        if(!isMatch){
            return res.status(500).json({msg: 'Wrong password!'});
        }

        // generating JWT token
        const JWT_KEY = process.env.JWT_KEY;
        const token = jwt.sign({id: user._id}, JWT_KEY, {expiresIn: '1h'});

        // setting token as HTTP only cookie
        res.cookie('token', token, {httpOnly: true});
        return res.status(200).json({ msg: 'Login successful' });        // redirect to the home page in frontend (passwordSuccessError.js)

        
    } catch (error) {
        return res.status(500).json({msg:error});
    }
};

const logOut = async (req,res)=>{
    res.clearCookie('token');
    return res.redirect('/login');
}




module.exports = {signUp, login,logOut};