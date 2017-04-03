const express = require('express');
const router = new express.Router();
const User = require('mongoose').model('User');
const Merchant = require('mongoose').model('Merchant');
const Product = require('mongoose').model('Product');
const CartItem = require('mongoose').model('CartItem');
const Cart = require('mongoose').model('Cart');

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
    console.log("i here "+ user);
    if (user.cartRef){
      console.log(user.cartRef + "I IS HERE");

    return Cart.findById(user.cartRef).exec();
  }
  else{
    console.log("YO I AM HERE AND I MADE A NEW CART");
    //created an empty cart
    var cart = new Cart({
      creatordId: req.user,
      users:[req.user],
      merchantId: req.body.merchantId,
      totalAmountDue: 0,
      totalPrice: 0,
      deliveryAddress:""//change later - clur
    })
    return cart.save();
  }
    //found a cart
  })

  .then(function(cart){

    console.log("IM IN THE CART LALALA" + cart);

    cart.totalAmountDue = Number.parseInt(cart.totalAmountDue) + Number.parseInt(req.body.price.substring(1,req.body.price.length));
    cart.totalPrice = Number.parseInt(cart.totalPrice) + Number.parseInt(req.body.price.substring(1,req.body.price.length));
    return cart.save();
  })
  .then(function(cart){
    var newItem = new CartItem({

        merchantId: req.body.merchantId,
        productName: req.body.title,
        price: req.body.price.substring(1,req.body.price.length),
        orderedBy:req.user._id,
        paidBy:req.user._id,
        isPaidFor:false,//do i need to change this? - clur
        cartId:cart._id,
        src: req.user.link

      })
      return newItem.save();
  }).then(function(cartItem){
    return Cart.findById(cartItem.cartId).exec()
  })
  .then(function(cart){
    console.log("DIS MY CARTID BITCHES"+ cart._id);
    req.user.cartRef = cart._id;
    return req.user.save();
  })




  .catch(function(err){
    console.log('error: ',err);
  })



})




module.exports = router;





//
//
// if(cart){
//   console.log("I FOUND THE CART BITCHES" + cart);
//   var newItem = new CartItem({
//
//     merchantId: req.body.merchantId,
//     productName: req.body.title,
//     price: req.body.price.substring(2,req.body.price.length),
//     orderedBy:req.user._id,
//     paidBy:req.user._id,
//     isPaidFor:false,//do i need to change this? - clur
//     cartId:cart._id,
//     src: req.user.link
//
//   })
//   return newItem.save();
// } else{
//
//
//   console.log("YO I AM HERE AND I MADE A NEW CART");
//   var newCart = new Cart({
//     creatordId: req.user._id,
//     users:[req.user],
//     merchantId: req.body.merchantId,
//     totalAmountDue: req.body.price.substring(1,req.body.price.length),
//     totalPrice: req.body.price.substring(1,req.body.price.length),
//     deliveryAddress:""//change later - clur
//   })
//   newCart.save();
//
//   var newItem = new CartItem({
//     merchantId: req.body.merchantId,
//     productName: req.body.title,
//     price: req.body.price.substring(1,req.body.price.length),
//     orderedBy:req.user._id,
//     paidBy:req.user._id,
//     isPaidFor:false,//do i need to change this? - clur
//     cartId:newCart._id, //wut
//     src: req.user.link
//
//   })
//   req.user.cartRef = newCart;
//   req.user.save();
//   return newItem.save();
// }
// //this thing is nested..how to fix? - clur
// }).catch(function(err){
// console.log('error: ',err);
// })
