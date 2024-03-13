
const express = require('express');
const mongoose = require('mongoose')


const app = express();
const bodyParser =require('body-parser');
const { default: mongoose } = require('mongoose');
app.set('view engine','ejs')

const category =require('./controllers/category')
const produit = require('./controllers/produit');
const authenticate = require('./middleware/authenticate');

app.use(authenticate)
app.use("/product",produit)
app.use("/category",category)


MONGODB_URI='taktak';

mongoose.connect(MONGODB_URI)

app.listen(3000,()=>{
    console.log('server is running on port 3000')
})
