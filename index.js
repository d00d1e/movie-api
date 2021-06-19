const path = require("path");

const express = require("express");
const morgan = require("morgan"); //HTTP request logger middleware function
const bodyParser = require("body-parser"); //read 'body' of HTTP requests
const cors = require("cors");
const { check, validationResult } = require("express-validator"); //server-side validation for inputted data
require("dotenv").config();

//mongoose config
const mongoose = require("mongoose");
const Models = require("./models.js");
const Movies = Models.Movie;
const Users = Models.User;

// mongoose.connect('mongodb://localhost:27017/iFlixDB', {useNewUrlParser: true});
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// middleware functions
const app = express(); //variable that encapsulates Express's methods
app.use(express.static(__dirname + "public")); //routes all requests for static files to 'public' folder
app.use("/client", express.static(path.join(__dirname, "client", "dist")));
app.use(morgan("common")); //request log using Morgans 'common' format
app.use(bodyParser.json()); //stores JS object accessible through req.body

// inform server: client-side routes handled by sending dist/index.html file
app.get("/client/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

//import auth.js (place after bodyParser)
let auth = require("./auth")(app);

//Passport modules
const passport = require("passport");
require("./passport");

// CORS
let allowedOrigins = [
  "*",
  "http;//localhost:8000",
  "https://i-flix.herokuapp.com/",
  "http://localhost:1234",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      //if specific origin isnt found on list of allowed origins
      if (allowedOrigins.indexOf(origin) === -1) {
        let message =
          "The CORS policy for this application doesn’t allow access from origin " +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);

//--- API Endpoints ---//

// GET- default response when request hits root folder
app.get("/", (req, res) => {
  let responseText = "Welcome to iFlix!!";
  res.send(responseText);
});

// GET- get a list of all movies
app.get(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// GET- get data for a single movie by title
app.get(
  "/movies/:title",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ Title: req.params.title })
      .then((movie) => {
        res.status(201).json(movie);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// GET- get data about a specific genre
app.get(
  "/genre/:genre",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ "Genre.Name": req.params.genre })
      .then((movies) => {
        res.status(201).json(movies.Genre);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// GET- get data about a specific director
app.get(
  "/director/:director",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ "Director.Name": req.params.director })
      .then((movies) => {
        res.status(201).json(movies.Director);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// GET- get a list of all users
app.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.find()
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// GET- get a user by username
app.get(
  "/users/:username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOne({ username: req.params.username })
      .populate({ path: "favorites", model: "Movie" })
      .exec((err, favorites) => {
        if (err) return handleError(err);
        // console.log(favorites);
      })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// POST- add new user
app.post("/users", (req, res) => {
  //validation logic
  [
    check("username", "Username cannot have fewer than 3 characters.").isLength(
      { min: 3 }
    ),
    check(
      "username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("password", "Password is required").not().isEmpty(),
    check("email", "Email does not appear to be valid.").isEmail(),
  ],
    (req, res) => {
      let errors = validationResult(req); //check validation obj for errors
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
    };

  let hashedPassword = Users.hashPassword(req.body.password);

  Users.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.username + " already exists.");
      } else {
        Users.create({
          username: req.body.username,
          password: hashedPassword,
          email: req.body.email,
          birthday: req.body.birthday,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error: " + err);
    });
});

// PUT- update user info
app.put(
  "/users/:username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { username: req.params.username },
      //update fields sent by user, extracted from request body
      {
        $set: {
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          birthday: req.body.birthday,
        },
      },
      { new: true }
    ) //return updatad document
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// POST- add a movie to list of favorites
app.post(
  "/users/:username/favorites/:movieId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { username: req.params.username },
      { $push: { favorites: req.params.movieId } },
      { new: true }
    )
      .save((err) => {
        console.log(err);
      })
      .then((movie) => {
        res.status(201).json(movie);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// DELETE- remove a movie from list of favorites
app.delete(
  "/users/:username/favorites/:movieId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { username: req.params.username },
      { $pull: { favorites: req.params.movieId } },
      { new: true }
    )
      .then((movie) => {
        if (movie) {
          res.status(201).json(movie);
        } else {
          res.status(400).send("This movie is not in your favorites.");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// DELETE- delete user
app.delete(
  "/users/:username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndRemove({ username: req.params.username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.username + " was not found.");
        } else {
          res.status(200).send(req.params.username + " was deleted");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// error handling middleware (defined last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Uh-oh! Something went wrong...");
  next();
});

// catchall handler
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// pre-configured port number in the env variable first
const port = process.env.PORT || 8000;
app.listen(port, "0.0.0.0", () => {
  console.log("Server started on port " + port);
});
