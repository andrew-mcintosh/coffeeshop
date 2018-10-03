var express = require('express');
var app = express();


app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/coffeeshops", function(req, res){
    var coffeeshops = [
        {name: "Tim Hortons", image: "https://images.unsplash.com/photo-1504194377022-9e04c123352f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=532ede673a4e8fe79d6c8339ccdf8520&auto=format&fit=crop&w=750&q=80"},
        {name: "Second Cups", image: "https://images.unsplash.com/photo-1504194377022-9e04c123352f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=532ede673a4e8fe79d6c8339ccdf8520&auto=format&fit=crop&w=750&q=80"},
        {name: "Starbucks", image: "https://images.unsplash.com/photo-1504194377022-9e04c123352f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=532ede673a4e8fe79d6c8339ccdf8520&auto=format&fit=crop&w=750&q=80"}
    ]
    res.render("coffeeshops");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("CoffeeShop server has started");
});