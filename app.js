const express = require('express');
const bodyParser=require('body-parser');
const Product = require('./models/product')
const mongoose = require('mongoose');

const app = express();

//Connecting our node server to Mongo Db cloud server via Mongoose
mongoose.connect("mongodb+srv://sanjay:0TFkCKMaLEllpiBH@teashop-4gomh.mongodb.net/all-about-teas?retryWrites=true") 
//connect method return promise and hence it can be chainned with .then()
    .then(()=>console.log("Successfully connected to Mongo Database"))
    .catch(()=>{
        console.log("Something went wrong");
    })
//connection code end....


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))


//CORS setup start......
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );

    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
})
//CORS setup end.....


app.get('/', (req, res)=>{
    Product.find()
        .then((documents)=>{
            // console.log('documents', documents);
            res.status(200).json(documents);
        })
    // res.send(products);
})

app.post('/add-product', (req, res)=>{
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


module.exports=app;