require('dotenv').config();
const express = require('express');
const axios = require('axios');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const db = require('./models')

// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);

// Adds some logging to each request
app.use(require('morgan')('dev'));

// Routes
app.get('/', function(req, res) {
  // console.log(process.env.RANDOM_ENV_VAR)
  res.render('index');
});

app.get('/results', (req, res)=> {
  let s = req.query.s
  axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=${process.env.API_KEY}&&s=${s}`)
    .then((response)=>{
      // res.send(response.data.Search);
        res.render('results', {movies: response.data.Search})
    })
});

app.get('/movies/:idx', (req,res)=>{
  axios.get(`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&&i=${req.params.idx}`)
  .then((response)=>{
    // res.send(response.data);
      res.render('detail', {movie: response.data})
  })
})

app.post('/faves', (req,res) =>{
  
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
