const express = require('express');
const router = new express.Router();
const User = require('mongoose').model('User');
const Merchant = require('mongoose').model('Merchant');
const Product = require('mongoose').model('Product');
const CartItem = require('mongoose').model('CartItem');
const Cart = require('mongoose').model('Cart');
const config = require('../../config');
const stripe = require('stripe')(config.STRIPE_TOKEN);
const Promise = require('bluebird');
const validate = require('validate.js');


function success(attributes) {
  console.log("Success!", attributes);
  return attributes
}

function error(errors) {
  if (errors instanceof Error) {
    // This means an exception was thrown from a validator
    console.err("An error ocurred", errors);
  } else {
    console.log("Validation errors", errors);
  }
  return errors;
}
const pattern = new RegExp("^[0-9]+ .+$")

var constraints = {
  "address":{
    presence: true,
    format: {
      // Must be numbers followed by a name
      pattern: "^[0-9]+ .+$",
      message: "^The street for the shipping address must be a valid street name"
    }
  }
}

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
router.post('/lmao', function(req,res){
  //for clur's testing purposes only
  var promise = User.findById(req.user._id).exec();
  promise.then(function(user){
    user.cartRef=undefined
    return user.save();
  }).then(function(user){
    res.status(200).json({
      user:user
    })

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
      console.log(req.body)

      console.log("YO I AM HERE AND I MADE A NEW CART");
      //created an empty cart
      var cart = new Cart({
        creatorId: req.user._id,
        users:[req.user],
        merchantId: req.body.merchantId,
        totalAmountDue: 0,
        totalPrice: 0,
        address: {}//change later - clur
      })
      return cart.save();
    }
    //found a cart
  }).then(function(cart){
    //TODO:this is an unhandled promise
    // const add = req.body.address.
    console.log(req.body.merchantId)
    const yo = req.body.address.line1 +""+ req.body.address.line2+ req.body.address.city + req.body.address.state+req.body.address.zip
    if(pattern.test(yo)){
      console.log("im in here");
      cart.deliveryAddress=req.body.address
    }
    return cart.save();
})
  .then(function(cart){
    console.log("DIS MY CARTID BITCHES"+ cart._id);
    req.user.cartRef = cart._id;
    res.status(200).json({
      cartId:cart._id,
      user: req.user
    })
    return req.user.save();
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

router.get('/joinCartShop/:cartId', function(req, res) {
  console.log('joining the cart: ', req.params.cartId);
  res.status(200).send({
    cart: '123'
  });
})


router.post('/organizecart/:cartId', function(req,res){
  console.log('Trying to get other items for cart: ', req.params.cartId);
  //returns an organized array of objects with structure of
  //{name: "name",products:[related product objects]}
  //example: [ { name: 'bob bob', products: [ [Object] ] },
  // { name: 'dan dan', products: [ [Object], [Object] ] } ]
  var bigArr = []; //array of products in cart except that of user's
  var users = []; //array of all users in cart except that of primary user's
  var returnedArr = []; //returned array of name and products associated
  function getUsername(id){
    return User.findById(id).exec()
  }

   CartItem.find({cartId:req.params.cartId, orderedBy:{$ne:req.user._id}}).exec()
   .then(function(array){
     bigArr=array;
    return Cart.findById(req.params.cartId).exec()
  }).then(function(cart){
    var arr = cart.users;
      var index = arr.indexOf(req.user._id);
      if (index > -1){
        arr.splice(index, 1);
      }
      users = arr;
      console.log(arr);
      return Promise.resolve(users);
   }).then(function(users){
     for (var i = 0; i < users.length; i++){
       users[i] = getUsername(users[i])
     }
     return Promise.all(users);
   })
   .then(function(users){
     for(var i = 0; i <users.length; i++){
       obj = {};
       obj.name = users[i].name;
       obj.paid = users[i].paid;
       userProducts =[]
       for(var x = 0; x< bigArr.length; x++){
         if(JSON.stringify(bigArr[x].orderedBy) === JSON.stringify(users[i]._id)){
           userProducts.push(bigArr[x])
         }
       }
       obj.products = userProducts;
       returnedArr.push(obj);;
     }
     return Promise.resolve(returnedArr)
   }).then(function(returnedObj){
     res.status(200).json({
       returnedArray: returnedObj
     })
   }).catch((err)=>{res.status(500).send({
     error:err
   })});

})

module.exports = router;
