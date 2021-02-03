//authenticate login requests using basic HTTP auth
//generate JWT for user

const jwtSecret = 'my_jwt_secretkey'; //same key used in JWTStraegy
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('./passport'); //local passport file


function generateJWTToken(user) {
  return jwt.sign(user, jwtSecret, {
    subject: user.username, //username to be encoded in JWT
    expiresIn: '7d',
    algorithm: 'HS256' //algorithm used to sign/encode the values of the JWT
  });
}

//--- POST login ---//
module.exports = (app) => {
  app.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        //if user/pw exists (from LocalStrategy), genereate JWT
        let token = generateJWTToken(user.toJSON());
        return res.json({user, token});
      });
    })(req,res);
  });
};