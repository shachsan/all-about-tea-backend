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

const products=[
    // {name:'Darjeeling Tea', description:'Black tea', category:'black tea', price:22.50, priceType:'reg', brand:'Mariage', size:16, sizeUnit:'oz',imageUrl:'https://cdn.shopify.com/s/files/1/1935/9089/products/mariage-freres-darjeeling-princeton-black-tea-tin_800x.jpg?v=1497906447'},
    //  {name:'Eros Tea', description:'Black tea', category:'black tea', price:20.50, priceType:'reg', brand:'Mariage', size:30, sizeUnit:'bags',imageUrl:'https://images-na.ssl-images-amazon.com/images/I/51IBrd4JbkL._SY355_.jpg'},
    //  {name:'Japanese Green Tea', description:'Green tea', category:'Green tea', price:12.50, priceType:'reg', brand:'Dean & Deluca', size:16, sizeUnit:'oz', imageUrl:'https://www.deandeluca.com/media/catalog/product/cache/1/small_image/400x/9df78eab33525d08d6e5fb8d27136e95/3/6/362075_1_1.jpg'},
    //  {name:'Silver Moon', description:'White tea', category:'white tea', price:18, priceType:'reg', brand:'TWG TEA', size:12, sizeUnit:'oz', imageUrl:'https://www.davidjones.com/productimages/thumb/1/1439517_11890550_1140711.jpg'},
    //  {name:'White House Tea', description:'White tea', category:'white tea', price:18, priceType:'reg', brand:'TWG TEA', size:12, sizeUnit:'oz', imageUrl:'http://twgtea.com/Files/Images/TWG-Tea/Products/detailzoom1200x900/TCTWG6042.jpg'},
    //  {name:'Japanese Green Tea', description:'Green tea', category:'Green tea', price:10.50, priceType:'reg', brand:'Republic of Tea', size:10, sizeUnit:'oz', imageUrl:'https://static.trotcdn.com/images/325/v00586.jpg'},
    //  {name:'Russian Blend Tea', description:'Black tea', category:'black tea', price:22.50, priceType:'reg', brand:'Palias de thes', size:16, sizeUnit:'oz', imageUrl:'http://cdn.shopify.com/s/files/1/2454/8899/products/7-citrus-russian-blend-black-tea-palais-des-thes-palais-des-thes-palais-des-thes_1024x1024.png?v=1513374900'},
];

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