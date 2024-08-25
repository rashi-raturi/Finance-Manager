const jwt = require('jsonwebtoken');
const User = require('../models/users');
require('dotenv').config();

const authenticateToken = async (req,res,next) =>{
    try {
        // retrieves value of authentication header in http request
        const token = req.cookies.token || req.header('Authentication')?.replace('Bearer ', ''); // retrieving token from cookie
        if(!token){
            // return res.status(401).json({msg: 'No token provided'});
            return res.redirect('/login');
        }

        const JWT_KEY = process.env.JWT_KEY;
        // verifying the token
        const decoded = jwt.verify(token, JWT_KEY);
        const user = await User.findById(decoded.id).populate('account');
        
        if(!user) return res.redirect('/login');
            
        // attaching user to request object
        req.user = user;
        next();

    } catch (error) {
        console.error("Authentication error:", error);
        return res.redirect('/login');
    }
    
    
};

module.exports = authenticateToken;