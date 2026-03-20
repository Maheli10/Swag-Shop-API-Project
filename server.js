var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require ('mongoose');
var db= mongoose.connect('mongodb://localhost/swag-shop');

var product = require('./model/product');
var wishlist = require('./model/wishlist');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/product', function(request, response){
    var Nproduct = new product();
    Nproduct.title = request.body.title;
    Nproduct.price = request.body.price;
    Nproduct.save(function(err, savedProduct){
        if(err){
            response.status(500).send({error: "Could not save product"});
        }
        else{
            response.status(200).send(savedProduct);
        }
    })
})

app.get('/', function(req, res){
    res.send("Welcome to Swag Shop API,hii ");
    
});

app.listen(3000,function(){
    console.log("Swag shop api running on port 3000");
});