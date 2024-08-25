const express = require('express');
const path = require('path');

const authenticateToken = require('../middlewares/authenticateToken');
const User = require('../models/users')
const {
    getTotal,
    getTransactionsThisMonth} = require('../controllers/calculations');

const router = express.Router();

router.route('/').get(authenticateToken, async (req,res)=>{
    try {
        // populate user with account information
        const user = await User.findById(req.user._id).populate('account').populate('transactions');

        const totalIncome = await getTotal(req.user._id,'income');
        const totalExpense = await getTotal(req.user._id,'expense');
        const transactions = await getTransactionsThisMonth(req.user._id);
        res.render('index', 
            {
                user: user,
                transactions: transactions,
                totalExpense: totalExpense, 
                totalIncome: totalIncome
            });

    } catch (error) {
        return res.status(500).json({msg: error});
    }
    
});

router.route('/login').get((_,res)=>{
    res.sendFile(path.join(__dirname,'..', 'public/html', 'login.html'));
});

router.route('/signup').get((_,res)=>{
    res.sendFile(path.join(__dirname, '..','public/html', 'signup.html'));
});


module.exports = router;