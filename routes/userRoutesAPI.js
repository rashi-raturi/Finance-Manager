const express = require('express');
const path = require('path');
const authenticateToken = require('../middlewares/authenticateToken');
const {
    login,
    logOut,
    signUp} = require('../controllers/users');

const {
    createTransaction,
    deleteTransaction,
    getAllTransactions} = require('../controllers/transactions');

const {
    resetPassword, 
    resetPasswordRequest} = require('../controllers/resetPass')


const router = express.Router();


// login, signup and logout
router.route('/login').post(login);
router.route('/signup').post(signUp);
router.route('/logout').post(logOut);


// transactions
router.route('/transactions').post(authenticateToken, createTransaction)
.get(authenticateToken, getAllTransactions)
.get(authenticateToken, (_,res)=>{
    res.sendFile(path.join(__dirname,'..', 'public/html' ,'transactions.html'));
});
router.route('/transactions/:id').delete(deleteTransaction);


// Route to request a password reset
router.route('/reset-password').post(resetPasswordRequest)
.get((_,res)=>{
    res.sendFile(path.join(__dirname, '..', 'public/html', 'resetPasswordRequest.html'));      // forgot password? redirects here
});


// Route to handle the actual password reset
router.route('/reset/:token').post(resetPassword)
.get((req,res)=>{                                                                   // redirects here from email link
    res.render('resetPassword', {token: req.params.token});                         // form for resetting
});


module.exports = router;