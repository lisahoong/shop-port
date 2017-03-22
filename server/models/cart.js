const mongoose = require('mongoose');
const User = require('mongoose').model('User');

const CartSchema = new mongoose.Schema({
  creatorId: String,   // userId
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }], //userIds
  merchantId: String,  // MerchantId
  totalAmountDue: { //Amount due for the cart
    type: Number,
    default: 0
  },
  totalPrice: { //Amount due for each user
    type: Number,
    default: 0
  },
  tax:{
    type: Number,
    default: 0.085
  },
  allPaid: {
    type: Boolean,
    default: false
  },
  deliveryAddress: String
});

module.exports = mongoose.model('Cart', CartSchema);
