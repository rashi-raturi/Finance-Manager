const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : true
    },
    balance : {
        type : Number,
        default : 0,
    }
});

module.exports = mongoose.model('accounts', accountSchema);