const express = require('express');
const morgan = require('morgan'); //HTTP request logger middleware function
const bodyParser = require('body-parser'); //read 'body' of HTTP requests
const uuid = require('uuid');
const app = express(); //variable that encapsulates Express's methods

//mongoose config
const mongoose = require('mongoose');
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;

// mongoose.connect('mongodb://localhost:27017/iFlixDB', {useNewUrlParser: true});
mongoose.connect('mongodb+srv://iFlixDBAdmin:P0pcorns@iflixdb-npbrh.mongodb.net/iFlixDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });


// middleware functions
app.use(express.static('public')); //routes all requests for static files to 'public' folder
app.use(morgan('common')); //request log using Morgans 'common' format
app.use(bodyParser.json()); //stores JS object accessible through req.body


//--- API Endpoints ---//

// GET- default response when request hits root folder
app.get('/', (req, res) => {
  var responseText = "Welcome to iFlix!!";
  res.send(responseText);
});

// GET- get a list of all movies
app.get('/movies', (req, res) => {
  Movies.find()
  .then((movies) => {
    res.status(201).json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// GET- get data for a single movie by title
app.get('/movies/:title', (req, res) => {
  Movies.findOne({ Title: req.params.title })
  .then((movie) => {
    res.status(201).json(movie);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// GET- get data about a specific genre
app.get('/movies/genre/:genre', (req, res) => {
  Movies.findOne({ 'Genre.Name': req.params.genre})
	.then((movies) => {
		res.status(201).json(movies.Genre);
	})
	.catch((err) => {
		console.error(err);
		res.status(500).send('Error: ' + err);
	});
});

// GET- get data about a specific director
app.get('/movies/director/:director', (req, res) => {
  Movies.findOne({ "Director.Name": req.params.director})
	.then((movies) => {
		res.status(201).json(movies.Director);
	})
	.catch((err) => {
		console.error(err);
		res.status(500).send('Error: ' + err);
	});
});

// POST- add new user
app.post('/users', (req, res) => {
  Users.findOne({ username: req.body.username })
  .then((user) => {
    if (user) {
      return res.status(400).send(req.body.username + ' already exists.');
    } else {
      Users
      .create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        birthday: req.body.birthday
      })
      .then((user) => { res.status(201).json(user); })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send('Error: ' + err);
  });
});

// PUT- update user infp
app.put('/users/:username', (req, res) => {
  Users.findOneAndUpdate({ username: req.params.username },
		//update fields sent by user, extracted from request body
		{$set : {
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
			birthday: req.body.birthday
		}},
		{ new: true }) //return updatad document
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
})

// POST- add a movie to list of favorites
app.post('/users/:username/movies/:movieId', (req, res) => {
  Users.findOneAndUpdate({ username: req.params.username },
    { $push: { favorites: req.params.movieId } },
    { new: true })
  .then((movie) => {
    res.status(201).json(movie);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// DELETE- remove a movie from list of favorites
app.delete('/users/:username/movies/:movieId', (req, res) =>{
  Users.findOneAndUpdate({ username: req.params.username },
    { $pull: { favorites: req.params.movieId } },
    { new: true })
  .then((movie) => {
    if(movie){
      res.status(201).json(movie);
    } else {
      res.status(400).send('This movie is not in your favorites.');
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// DELETE- delete user
app.delete('/users/:username', (req, res) => {
  Users.findOneAndRemove({ username: req.params.username })
	.then((user) => {
		if(!user){
			res.status(400).send(req.params.username + ' was not found.');
		} else {
			res.status(200).send(req.params.username + ' was deleted');
		}
	})
	.catch((err) => {
		console.error(err);
		res.status(500).send('Error: ' + err);
	});
});


// error handling middleware (defined last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Uh-oh! Something went wrong...');
	next();
});


app.listen(8000, () => {
  console.log('Server started on port 8000');
})