require('dotenv').config({path : './.env'}); 
const cors = require('cors');
const express = require('express');
const registerRoutes = require('./routes/Authroutes');
const mongoose = require('mongoose');

const Product = require('./models/product');
const Contract = require ("./models/contract");
const contracts = require ("./routes/contract");
const Insurance = require ("./models/insurance");
const insurances= require ("./routes/insurance");
const products = require("./routes/product")


mongoose.connect(process.env.DATABASE)
 


const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
app.use('/', registerRoutes);
 

app.listen(PORT ,(error) => {
    if(!error){
        console.log(`The apps is running on port ${PORT} `)
    }
    else{
        console.log("error occured", error)
    }
})


const db = mongoose.connection

db.on("error", (error) => {

console.error("MongoDB connection Error ",error)

})


db.once("open", async ()=>{

    try{

        const productCollectionExists = await Product.exists()
        const contractCollectionExists = await Contract.exists()
        const insuranceCollectionExists = await Insurance.exists()


        if( !productCollectionExists  && !contractCollectionExists && !insuranceCollectionExists){
                await  Product.createIndexes();  
                await  Contract.createIndexes();  
                await  Insurance.createIndexes();  


                console.log("index created for products collection and contracts and insurances ")
            }else{
                console.log("products collection already exists and Contracts and insurances ")
            }
    
    
        }catch(error){

            console.log("Error creating Product Collection ",error)
        }
   

    })
    app.use("/product", products)
    app.use('/contract',contracts)
    app.use('/insurance',insurances)
    

