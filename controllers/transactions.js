const Transaction = require('../models/transactions');
const Account = require('../models/accounts');

const createTransaction = async (req,res)=>{
    try {
        const userId = req.user._id;
        const amount = Number(req.body.amount);
        const date = req.body.date ? req.body.date : Date.now();
        const type = req.body.type;
        const category = req.body.category;

        // creating the transaction
        const newExpense = new Transaction({
            userId,
            amount,
            date,
            type,
            category
        });
        await newExpense.save();

        // finding users account
        const account = await Account.findOne({userId});

        // updating balance based on the type
        if(type === 'expense'){
            account.balance -= amount;
        }
        else if(type === 'income'){
            account.balance += amount;
        }
        else{
            return res.status(400).json({msg: 'Invalid type! Please choose the type.'});
        }
        await account.save();

        // return res.status(201).json({msg: 'balance updated!'});
        res.redirect('/');


    } catch (error) {
        return res.status(500).json({msg:error});
    }
};

const deleteTransaction = async (req,res)=>{
    try {
        const {id} = req.params;
        const transaction = await Transaction.findById(id);

        if (!transaction) {
            return res.status(404).json({ msg: 'Transaction not found' });
        }

        const account = await Account.findOne({ userId: transaction.userId });
        // Update the account balance based on the transaction type
        if (transaction.type === 'expense') {
            account.balance += transaction.amount;  // Add back the expense amount
        } else if (transaction.type === 'income') {
            account.balance -= transaction.amount;  // Subtract the income amount
        }

        await account.save();
        await Transaction.findByIdAndDelete(id);
        
        return res.status(200).json({msg: 'Transaction deleted successfully!'});

    } catch (error) {
        return res.status(500).json({msg:error});
    }
}

const getAllTransactions = async (req,res)=>{
    try {
        const userId = req.user._id;

        const transactions = await Transaction.find({userId: userId});
        return res.send(transactions);

    } catch (error) {
        return res.status(500).json({msg:error});
    }
}

module.exports = {createTransaction, deleteTransaction, getAllTransactions};