const express = require('express');
const port = 3000;
const app = express();

// Set some data for dynamic view
var fortunes = [
  "Conquer your fears or they will conquer you.",
  "Rivers need springs.",
  "Do not fear what you don't know.",
  "You will have a pleasant surprise.",
  "Whenever possible, keep it simple."
];

// Set Template Engine to Handlebars
var handlebars = require('express3-handlebars').create({defaultLayout : 'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

// Use middleware for serving static files
app.use(express.static(__dirname + '/public'));

// Set Routes for Responding with the Required views
app.get('/', function(req, res){
  res.render('home');
});
app.get('/about', function(req, res){
  var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render('about', {fortune : randomFortune});
});

// Set middleware for handling incorrect URLs
app.use(function(req, res, next){
  res.status(404);
  res.render('404');
});

// Set middleware for handling internal server error
app.use(function(err, req, res ,next){
  res.status(500);
  res.render('500');
});

// Start server
app.listen(port);

console.log("Server started on port " + port);
