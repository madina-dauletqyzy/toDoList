const express = require('express');

const bodyParser = require('body-parser');



const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

let items = [];
let workItems = [];

app.use(express.static(__dirname + '/public/css'));

app.get('/', function(req, res){
    
    let today = new Date();
    let options = {  
        weekday: 'long', 
        day: 'numeric', 
        month: 'long'
    };
    let currentDay = today.toLocaleDateString('en-US', options);
    
    
    res.render('lists', {listTitle: currentDay, newListItems: items});
    res.send();
})


app.get('/work', function(req, res){
    res.render('lists', {listTitle: "Work day", newListItems: workItems});
    res.send();
})

app.post('/', function(req, res){
    let item = req.body.newItem;
    
    if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect('/work');
    }else{
        items.push(item);
        res.redirect('/');
    } 
})
app.listen(3000, function(){
    console.log("server is running...")
})