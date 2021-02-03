const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Movie Model
var movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String
  },
  Actors: [String],
  imageUrl: String,
  Featured: Boolean
});


// User Model
var userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  birthday: { type: Date, trim: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

// hash password
userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

// compares hashed pw with hashed pw stored in db
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.Password);
};

//model used in index.js to CRUD documents in DB
let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

//export models into index.js file
module.exports = { Movie, User }