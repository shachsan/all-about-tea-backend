const express = require('express');
const Product = require('../models/product')

const router = express.Router();

router.get('', (req, res)=>{
    Product.find()
        .then((documents)=>{
            // console.log('documents', documents);
            res.status(200).json(documents);
        })
    // res.send(products);
})

router.post('', (req, res)=>{
    const newProduct=req.body;
    const product = new Product(newProduct);
    product.save(); //Here product is an model object and calling .save method provided by mongoose on this object 
    // will do the following behind the scence
    //* mongoose will create a document for newProduct
    //* documents are stored in a collection, so mongoose will create a collection which will named as pural form of 
    //  model name with all lowercase. For eg, in this case, our model name is 'Product'(uppercase), mongoose will create
    //  collection as 'products' if the collection doesn't already exist.
    res.status(201).json(newProduct)
})

module.exports = router;