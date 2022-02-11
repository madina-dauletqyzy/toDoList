const express = require('express');

const bodyParser = require('body-parser');



const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

var items = [];

app.get('/', function(req, res){
    
    var today = new Date();
    var options = {  
        weekday: 'long', 
        day: 'numeric', 
        month: 'long'
    };
    var currentDay = today.toLocaleDateString('en-US', options);
    
    
    res.render('lists', {kindOfday: currentDay, newListItems: items});
    res.send();
})

app.post('/', function(req, res){
    var item = req.body.newItem;
    
    items.push(item);

    res.redirect('/');
})

app.listen(3000, function(){
    console.log("server is running...")
})