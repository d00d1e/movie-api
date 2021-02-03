//Passport strategies config
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const Models = require('./models.js');

let Users = Models.User;
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;


//(LocalStrategy) define basic HTTP auth for login requests
//take username/password from req body, use mongoose to check db for user
passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, (username, password, callback) => {
  console.log(username + '  ' + password);
  Users.findOne({ username: username }, (error, user) => {
    if (error) {
      console.log(error);
      return callback(error);
    }
    if (!user) {
      console.log('incorrect username');
      return callback(null, false, {message: 'Incorrect username or password.'});
    }
    // if (!user.validatePassword(password, user.password)) {
    //   console.log('incorrect password');
    //   return callback(null, false, {message: 'Incorrect username or password.'});
    // }
    console.log('finished');
    return callback(null, user);
  });
}));

//(JWTStrategy) authenticate users based on JWT submitted alongside request
//JWT authentication for API endpoints
passport.use(new JWTStrategy({
  //JWT 'bearer token' extracted from header of HTTP request
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  //verify signature of JWT
  secretOrKey: 'my_jwt_secretkey'}, (jwtPayload, callback) => {
    return Users.findById(jwtPayload._id)
    .then ((user) =>{
      return callback(null, user);
    })
    .catch((error) => {
      return callback(error)
    });
}));