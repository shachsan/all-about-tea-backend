// steps to use mongoose
const mongoose = require('mongoose');

//step 1 Define a table schema
const postProduct = mongoose.Schema({
    name: {type:String, required:true},
    description: {type:String, required:true},
    category: String,
    price: {type:Number, required:true},
    priceType: String,
    brand: String,
    size: Number,
    sizeUnit: String,
    imageUrl: String,
    
});

module.exports = mongoose.model('Product', postProduct);