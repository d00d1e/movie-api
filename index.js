const express = require('express');
const morgan = require('morgan'); //HTTP request logger middleware function
const bodyParser = require('body-parser');
const uuid = require('uuid');
const app = express();


app.use(express.static('public')); //routes all requests for static files to 'public' folder
app.use(morgan('common')); //request log using Morgans 'common' format
app.use(bodyParser.json());


//--- API Endpoints ---//

// GET- default response when request hits root folder
app.get('/', (req, res) => {
  var responseText = "Welcome to iFlix!!";
  res.send(responseText);
});

// GET- return a list of all movies
app.get('/movies', (req, res) => {
  res.send("List of all movies");
});

// GET- return data for a single movie by title
app.get('/movies/:title', (req, res) => {
  res.send("get single movie title")
})

// GET- return data about a specific director
app.get('/movies/director/:Director', (req, res) => {
  res.send("Director info");
});

// GET- return data about a specific genre
app.get('/movies/genre/:Genre', (req, res) => {
  res.send("Genre info");
});

// POST- allow new user to register
app.post('/users', (req, res) => {
  res.send('user registered')
});

// PATCH-  allow user to update user info
app.patch('/users/:userId', (req, res) => {
  res.send("user info updated");
})

// POST- allow user to add a movie to list of favorites
app.post('/users/:username/favorites/:movieid', (req, res) => {
  res.send("movie added to favorites");
});

// DELETE- allow user to remove a movie from list of favorites
app.delete('/users/:username/favorites/:movieid', (req, res) =>{
  res.send("movie removed from favorites")
});

// DELETE- allow existing users to deregister
app.delete('/users/:username', (req, res) => {
  res.send('user account deleted');
});


// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.listen(8000, () => {
  console.log('Server started on port 8000');
})