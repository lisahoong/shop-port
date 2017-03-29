const express = require('express');
const validator = require('validator');
const passport = require('passport');
const Merchant = require('mongoose').model('Merchant');
const Product = require('mongoose').model('Product');
const User = require('mongoose').model('User');
const CartItem = require('mongoose').model('CartItem');

const router = new express.Router();



function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide your name.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = 'Please provide your email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
};


router.get('/loadmerchants', function(req, res) {
  Merchant.find({})
  .sort({name: 1})
  .exec()
  .then((merchants) => {
    res.status(200).json({
      message: 'Here are all your merchants bitch',
      allmerchants: merchants
    });
  })
  .catch((err) => res.sendStatus(500).send(err))
});

// router.get('/showproducts/:merchid', function(req, res) {
//   console.log('the id is: ', req.params.merchid);
// })


router.get('/showproducts/:merchId', function(req, res) {
  console.log('poop', req.params.merchId);
  Product.find({merchantId: req.params.merchId})
  .exec()
  .then(function(clothes) {
    console.log('clothes: ', clothes);
  })
  .catch((err)=>console.log('error: ', err));
  res.status(200).json({
    name: 'Karen'
  });
});

router.post('/addmerchant', function(req, res) {
  console.log('body:', req.body);
  var merch = new Merchant(req.body);
  merch.save()
  .then(res.status(200).send())
  .catch((err) => {
    console.log('Error: ', err);
    res.status(500).send(err);
  })
})

router.post('/addMerchantItem/:merchant', function(req, res) {

  var findMerchantPromise = new Promise(function(resolve, reject) {
    Merchant.findById(req.params.merchant, function(err, merchant) {
      if (err) {
        reject(err);
      }
      resolve(merchant);
    });
  });

  findMerchantPromise.then(function(foundMerchant) {
    req.body.forEach(function(item) {
      var product = new Product(item);
      product.merchantId = foundMerchant._id;
      product.save(function(err, prod) {
        if (err) {
          res.status(500).json({
            message: 'problem saving product'
          })
        }
      })
    })
    res.status(200).json({
      message: 'new products have been saved for ' + foundMerchant.name
    })
  })
  .catch((err) => res.status(500).json({
    message: 'merchant does not exist'
  }));
});


router.post('/signup', function(req, res, next) {
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return passport.authenticate('local-signup', (err) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        return res.status(409).json({
          success: false,
          message: 'Check the form for errors.',
          errors: {
            email: 'This email is already taken.'
          }
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'You have successfully signed up! Go to login page to log in.'
    });
  })(req, res, next);
});

router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }
      return res.status(400).json({
        success: false,
        message: 'Could not process the form'
      });
    }

    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: userData
    });
  })(req, res, next);
});

module.exports = router;
