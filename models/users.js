const mongoose = require('mongoose');
const bcrypt = require('bcrypt');      // for hashing passwords
const crypto = require('crypto');      // for generating forget password token

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'must provide name'],
        trim:true,
        maxlength: [20, 'name cannot be more than 20 characters']
    },
    email : {
        type : String,
        required : [true, 'must provide email'],
        unique : true,
        match : [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password : { // add regex validation and hashing
        type : String,
        required : [true, 'enter password']
    },
    resetPasswordToken : {
        type: String,
        default: undefined
    },
    resetPasswordExpires : {
        type: Date,
        default: undefined
    },
});

// this hook runs before saving a user document into the database
userSchema.pre('save', async function(next){
    const user = this;

    // password is hashed only when it is modified (when creating new user or modifying password)
    if(user.isModified('password')){
        // salt is used to ensure that even if two user have same password, their hashed passwords will be different
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }

    next();
});

// generating forget password token
userSchema.methods.generatePasswordReset = async function(){
    try {
        this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
        this.resetPasswordExpires = Date.now() + 3600000;  // expires after 1 hour

    } catch (error) {
        console.log(error);
    }
}

// populate user with account information
userSchema.virtual('account', {
    ref: 'accounts',            // model name
    localField: '_id',
    foreignField: 'userId',
    justOne: true               // only one account per user
});

// populate user with transaction info
userSchema.virtual('transactions',{
    ref: 'transactions',
    localField: '_id',
    foreignField: 'userId',
    justOne: false
});

module.exports = mongoose.model('users',userSchema);