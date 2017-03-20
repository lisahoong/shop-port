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
  name: String
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

module.exports = mongoose.model('User', UserSchema);
