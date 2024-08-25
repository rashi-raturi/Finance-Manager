const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.ObjectId,
        ref: 'User',
        required : true
    },
    date : {
        type: Date,
        default: Date.now()
    },
    amount : {
        type : Number,
        required : true
    },
    type : {
        type : String,
        enum : ['expense', 'income'],
        required : [true, 'must provide type (expense/income)']
    },
    description : String,
    category : {
        type : String,
        required : [true, 'must provide category']
    }
});

module.exports = mongoose.model('transactions', transactionSchema);