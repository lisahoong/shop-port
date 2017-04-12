const User = require('mongoose').model('User');
const Cart = require('mongoose').model('Cart');
const LocalStrategy = require('passport-local'). Strategy;
module.exports = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  var userData = {
    email: email.trim(),
    password: password.trim(),
    name: req.body.first.trim() + ' ' + req.body.last.trim(),
  };
  if (req.body.cartRef) {
    userData = {
      email: email.trim(),
      password: password.trim(),
      name: req.body.first.trim() + ' ' + req.body.last.trim(),
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
  newUser.save(function(err, u) {
    if (err) {
      return done(err);
    }
    console.log('new user: ', u);
    return done(null);
  })};
});
