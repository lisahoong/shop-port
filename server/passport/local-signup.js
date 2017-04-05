const User = require('mongoose').model('User');
const LocalStrategy = require('passport-local'). Strategy;
module.exports = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  //passReqToCallback must be true if we want to be able
  //to read other parameters in the POST body message
  passReqToCallback: true
}, (req, email, password, done) => {
  var userData = {
    email: email.trim(),
    password: password.trim(),
    name: req.body.name.trim(),
  };
  if (req.body.cartRef) {
    userData = {
      email: email.trim(),
      password: password.trim(),
      name: req.body.name.trim(),
      cartRef: req.body.cartRef
    }
  }
  const newUser = new User(userData);
  newUser.save(function(err) {
    if (err) {
      return done(err);
    }
    return done(null);
  });
});
