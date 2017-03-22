const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    index: {
      unique: true
    }
  },
  password: String,
  name: String,
  phone: String,
  admin: {
    type: Boolean,
    default: false
  }
});

UserSchema.methods.comparePassword = function comparePassword(password, cb) {
  bcrypt.compare(password, this.password, cb);
};

//hook method that will be executed before saving, the bcrypt module
//will generate a hash from a generated earlier salt string and user's pword
UserSchema.pre('save', function saveHook(next) {
  const user = this;

  //if the user modifies the password field
  if (!user.isModified('password')) {
    return next();
  }

  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) {
      return next(saltError);
    }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) {
        return next(hashError);
      }
      //replaces the user's password with something hashed
      user.password = hash;
      return next();
    });
  });
});

const MerchantSchema = mongoose.Schema({
  name: String,
  // items: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Product'
  // }]
  products: [{
    type: Object
  }]
});

const ProductSchema = mongoose.Schema({
  merchantId: String,
  title: String,
  link: String,
  src: String,
  price: String
});

const CartItemSchema = mongoose.Schema({
  merchantId: String,
  productName: String,
  price: Number,
  orderedBy: String, //userId
  paidBy: String, //userId
  isPaidFor: {
    type: Boolean,
    default: false
  },
  cartId: String,
  src: String
});

const CartSchema = mongoose.Schema({
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


const User = mongoose.model('User', UserSchema);
const Merchant = mongoose.model('Merchant', MerchantSchema);
const Product = mongoose.model('Product', ProductSchema);
const CartItem = mongoose.model('CartItem', CartItemSchema);
const Cart = mongoose.model('Cart', CartSchema);


module.exports = {
  User: User,
  Merchant: Merchant,
  Product: Product,
  CartItem: CartItem,
  Cart: Cart
};
