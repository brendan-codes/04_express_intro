var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

var app = express();

mongoose.connect('mongodb://localhost/04_ex');

app.use(express.static(path.join(__dirname, './static')));
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));


var PersonSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: [true, "You must put in a real number!!"]}
}, {timestamps: true});

var Person = mongoose.model('Person', PersonSchema);

mongoose.Promise = global.Promise

app.get('/', function(req, res){
    res.render('index');
})


app.post('/person/new', function(req, res){
    var new_person = new Person(req.body);
    console.log(new_person);
    new_person.save(function(err, results){
        console.log("are we here?")
        if(err){
            console.log('==== there is an error! =====')
            console.log(err);
            res.redirect('/');
        }else{
            console.log('==== save successful === ')
            console.log(results);
            res.redirect('/');
        }
    })
})




app.listen(8003, function(){
    console.log("8003 is the place to be");
})