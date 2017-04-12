const express = require('express');
const router = new express.Router();
const User = require('mongoose').model('User');
const Merchant = require('mongoose').model('Merchant');
const Product = require('mongoose').model('Product');
const CartItem = require('mongoose').model('CartItem');
const Cart = require('mongoose').model('Cart');
const config = require('../../config');
const stripe = require('stripe')(config.STRIPE_TOKEN);

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

router.get('/testing', function(req, res) {
  console.log('user: ', req.user);
  stripe.charges.create({
    amount: 5700,
    currency: "usd",
    source: "tok_discover",
    //source: "tok_19zdzkHKnjVYU11siwfia2Tp", // obtained with Stripe.js
    description: "Charge for testing purposes"
  }, function(err, charge) {
    // asynchronously called
    if (err) {
      console.log('err', err);
    } else {
      console.log('new charge', charge);
    }
  });
  res.status(200).json({
    message: 'a new charge was created but not really because i have been using the same token and it only works one time'
  })
})

router.post('/getUserItems', function(req, res) {
  CartItem.find({cartId: req.body.cart, orderedBy: req.user._id})
  .exec()
  .then(function(userItems) {
    console.log('user has', userItems);
    res.status(200).json({
      userItems: userItems
    })
  })
  .catch((err) => console.log('error: ', err))
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
router.post('/removecartitem/:cartId', function(req,res){

  CartItem.findOneAndRemove({
    cartId:req.params.cartId, productName: req.body.title,
    orderedBy:req.user._id}).exec()
    .then(function(cartitem){
      if (cartitem){
      console.log(cartitem + " dis success");}
      else{
        console.log("thisshit failed");
      }
    }).catch(function(err){
      console.log('error: ',err);
    })

})
router.post('/startgrouporder', function(req,res){
  var promise = User.findById(req.user._id).exec();
  promise.then(function(user){
    console.log("i here "+ user);
    //this counts on the user always being logged in
    if (user.cartRef){
      return new Error("this user has already started a group order");
    }
    else{
      console.log("YO I AM HERE AND I MADE A NEW CART");
      //created an empty cart
      var cart = new Cart({
        creatorId: req.user._id,
        users:[req.user],
        merchantId: req.body.merchantId,
        totalAmountDue: 0,
        totalPrice: 0,
        deliveryAddress:""//change later - clur
      })
      return cart.save();
    }
    //found a cart
  }).catch(function(err){
    console.log('error: ',err);
  })
})

router.post('/addcartitem', function(req,res){

  console.log(req.body);

  var promise = User.findById(req.user._id).exec();
  promise.then(function(user){
    console.log("i here "+ user);
    //this counts on the user always being logged in
    if (user.cartRef){
      console.log(user.cartRef + "I IS HERE");
      return Cart.findById(user.cartRef).exec();
    }
    else{
      return new Error('User has not created a cart yet');
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
      src: req.body.src


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

router.post('/organizecart/:cartId', function(req,res){
  function test(user, cartId){
    return CartItem.find({cartId:cartId, orderedBy:user}).exec()
  }
  Cart.findById(req.params.cartId).exec()
  .then(function(cart){
    var arr = cart.users;

    console.log("first "+ arr);
    var index = arr.indexOf(req.user._id);
    if (index > -1){
      arr.splice(index, 1);
    }
    console.log(arr);
    var newArr = [];
    arr.forEach(function(element){
      newArr.push(test(element, req.params.cartId));
    })
    res.status(200).json({
      user: req.user,
      products: newArr
    });
  }).catch((err)=>console.log('error: ', err));
  // CartItem.find({cartId:req.params.cartId, orderedBy:{$ne:req.user._id}}).exec()
  // .then(function(cartitems){
  //   res.status(200).json({
  //     user: req.user,
  //     products: cartitems
  //   });
  // }).catch((err)=>console.log('error: ', err));
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
