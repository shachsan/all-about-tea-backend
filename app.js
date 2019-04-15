const express = require('express');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');

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
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
})
//CORS setup end.....

app.use("/products", productRouter);
app.use("/users", userRouter);






module.exports=app;