const express = require('express');
const router = new express.Router();
const User = require('mongoose').model('User');
const Merchant = require('mongoose').model('Merchant');
const Product = require('mongoose').model('Product');
const CartItem = require('mongoose').model('CartItem');

router.get('/dashboard', function(req, res) {
  res.status(200).json({
    message: 'You are authorized to see this secret message'
  });
});

router.post('/addmerchant', function(req, res) {
  var merch = new Merchant(req.body);
  merch.save().catch((err) => {
    console.log('Error: ', err);
    res.status(500).send(err);
  })
})

router.get('/allmerchants', function(req, res) {
  Merchant.find({})
  .sort({name: 1})
  .exec(function(err, merchants) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json({
        allmerchants: merchants
      })
    }
  })
})

router.post('addMerchantItem', function(req, res) {
  var product = new Product(req.body);
  product.save().catch(function(err) {
    console.log('Error: ', err);
    res.status(500).send();
  })
})

router.post('/additem', function(req, res) {
  console.log('req body: ', req.body);
  //console.log('req: ', req);
  console.log('user: ', req.user);
  User.findById(req.user._id, function(err, user) {
    console.log(user.name);
  })
  res.status(200).send();
})

router.post('/addcartitem', function(req,res){

  console.log(req.body);
  var promise = User.findById(req.user._id).exec();
  promise.then(function(user){
    console.log("i here "+ user._id);
    return Cart.findById(user.cartRef);
    //found a cart
  })
    .then(function(cart){
      console.log("I FOUND THE CART BITCHES" + cart);
      var newItem = new CartItem({
        merchantId: req.body.

      })
    }, function(rejectcart){
      //cant fidn a cart, create a new one
    })

    // if (user.cartId){
    //   console.log("asuh" + user.cartId)
      // Cart.findById(user.cartId).exec()
      // .then(function(cart){
      //   console.log(cart);
      //   var cartitem = new CartItem({merchantId: req.body.merchantId,
      //   productName: req.body.title,
      //   price: req.body.price,
      //   orderedBy: req.user._id,
      //   paidBy: req.user._id,
      //   isPaidFor: false,
      //   cartId: cart._id,
      //   src: req.body.src
      //
      // }, function(rejection){
      //   var newCart = new Cart({
      //     creatorId: req.user._id,
      //     users:[req.user],
      //
      //   })
      // });
      //
      //
      // })
    // }
  })


module.exports = router;
