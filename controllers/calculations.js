const Transaction = require('../models/transactions');
const mongoose = require('mongoose');

const getTotal = async (userId, type)=>{
    try {
        // used to filter data
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        const total = await Transaction.aggregate([
            {
                // filter by userid, type and date
                $match: {
                    userId: Object(userId),
                    type: type,
                    date: {
                        $gte: startOfMonth,
                        $lte: endOfMonth
                    }
                }
            },
            {
                // grouping the matching records and summing up their amount
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$amount"}
                }
            }
        ]);

        return total.length > 0 ? total[0].totalAmount : 0;

    } catch (error) {
        console.log(error);
    }
};

const getTransactionsThisMonth = async(userId)=>{
    try {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(),now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(),now.getMonth() + 1, 0);

        const transactions = await Transaction.find({
            userId: userId,
            date: { 
                $gte: startOfMonth,
                $lte: endOfMonth 
            }
        }).sort({ date: -1 }); // Sort by date in descending order

        return transactions;

    } catch (error) {
        console.log(error);
    }
}


module.exports = {getTotal, getTransactionsThisMonth };