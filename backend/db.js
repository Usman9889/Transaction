const mongoose = require('mongoose')
const { number } = require('zod')

mongoose.connect("mongodb+srv://admin:usman9889a@cluster0.rrarz.mongodb.net/paytm")

//Creating a schema for user
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim:true,
        lowercase: true,
        minLength:3,
        maxLength:30
    },
    password:{
        type: String,
        required: true,
        minLength: 6
    },
    firstName:{
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    }
})

//creating a bank schema for account details
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true,
    },
    balance: {
        type: Number,
        required: true
    }
});

//creating a model for the schema
const Account = mongoose.model("Account", accountSchema)
const User = mongoose.model("User", userSchema)


module.exports = {
    User,
    Account
}