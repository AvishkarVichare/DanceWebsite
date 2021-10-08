const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 80;
const mongoose= require('mongoose');

// remember to install bodyparser for adding data to db  
const bodyparser = require('body-parser')

mongoose.connect('mongodb://localhost/contactDance');
var db = mongoose.connection;
db.on('error',console.error.bind(console,"unable to connect"));
db.once('open',()=>{
    console.log("connected to database successfully");
})

const formSchema = new mongoose.Schema({
    name:String,
    phome:String,
    age:Number,
    email:String,
    Address:String
})

const formData = mongoose.model('formData',formSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory



app.get('/', (req, res)=>{

    res.status(200).render('home.pug');
})
app.get('/contact', (req, res)=>{

    res.status(200).render('contact.pug');
})
app.post('/contact', (req, res)=>{

 var myData = new formData(req.body)
 myData.save().then(()=>{
     res.send("form submitted")
 }).catch(()=>{
     res.status.send("an error occured")
 })

})


app.get('/about', (req, res)=>{

    res.status(200).render('about.pug');
})





// START THE SERVER
app.listen(port , ()=>{
    console.log("succesfull")
})