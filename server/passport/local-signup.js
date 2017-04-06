const User = require('mongoose').model('User');
const Cart = require('mongoose').model('Cart');
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
    var newUser = new User(userData);
    newUser.save()
    .then(function(user){
      console.log("FUCKMEUP FAM " + req.body.cartRef)
      return Cart.findById(req.body.cartRef).exec();
    }).then(function(cart){
      console.log("MY USER IS DIS "+ newUser)
      console.log("this the ofound cart "+ cart);
      cart.users.push(newUser);
      return cart.save();
    }).then(function(cart){
      console.log(cart);
      console.log("YO IM REACHED");
      return done(null);
    }).catch(function(err){console.log(err)
      return done(err);
    });
  }else{
  var newUser = new User(userData);
  newUser.save(function(err) {
    if (err) {
      return done(err);
    }
    return done(null);
  })};
});
