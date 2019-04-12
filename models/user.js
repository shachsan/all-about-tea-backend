const mongoose = require('mongoose');

const User = mongoose.Schema({
    username:{type: String, required:true},
    password:{type: String, required:true},
    first_name:{type: String, required:true},
    middle_initial:String,
    last_name:{type: String, required:true},
    dob:Date,
    street_address:String,
    apt:String,
    city:String,
    state:String,
    zipcode:Number,
    billing_street_address: String,
    billing_apt:String,
    billing_city:String,
    billing_state:String,
    billing_zipcode:Number,
    fullName:String,
    cardNo:Number,
    card_expiry:String,
    secret:Number
})

module.exports = mongoose.model('User', User);