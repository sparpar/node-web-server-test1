const express = require("express");
const path = require('path');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

// specify to express what view engine to use
app.set('view engine','hbs');

// to prevent 304 status this piece of code tells the server to always read from the file system instead of browser cache
app.use(function(req, res, next) {
  req.headers['if-none-match'] = 'no-match-for-this';
  next();    
});

/*app.use((req,res,next) => {
   
    res.render('maintenance.hbs');
    
});*/

app.use( (req, res, next) => {
    var now = new Date().toString();
    console.log(`${now} : ${req.method} ${req.url}`);
    next(); 
});

hbs.registerHelper('getCurrentYear', () => {
   
    return new Date().getFullYear();
    
});

hbs.registerHelper('screamIt', (text) => {
   
    return text.toUpperCase();
    
});

app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req,res) => {
    
    res.render('home.hbs', {
        
        pageTitle: 'Home page'
         
        
    });
    
    // sending html (content-type) 
    //res.send("<h1>zazlouz</h1>");
    
    // sending json (content-type)
  /*  res.send({
       
        name: "samir",
        favorites: ["natation","foot","chess"]
        
    });*/
    
});

app.get('/about', (req,res) => {

    res.render('about.hbs',{
        
        pageTitle: 'About page'
        
    });
});

app.get('/bad', (req,res) => {
   
    res.send({
       
        error : "error message"
        
    });
    
});


app.listen(3000, () => {
    
    console.log("Start listening on port 3000")
    
});