const express = require("express");
const path = require("path");
const app = express();
const port = 5500;
const bodyparser= require('body-parser');
var mongoose = require('mongoose');
const { error } = require("console");
mongoose.connect('mongodb://localhost/contactDance',{useNewUrlParser:true});

var contactSchema= new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    address:String,
    desc:String
});
var Contact = mongoose.model('Contact',contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));
app.use(express.urlencoded({ extended: true }));

// PUG SPECIFIC STUFF
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
});
app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
});
app.post ('/contact', (req, res) => {
    var myData= new Contact(req.body);
    myData.save().then(()=>{
        // res.send('this message is recorded');
        res.render('thankyou.pug');
    }).catch(()=>{
        res.status(400).render('error.pug');
    });
    
});
app.get('/aboutus', (req, res) => {
    const params = {}
    res.status(200).render('aboutus.pug', params);
});



// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});
