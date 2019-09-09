const mongoose = require('mongoose');
const validator = require('validator');

// name, email, photo, password, passwordConfirmation

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.email, 'Please provide valid email']
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6
  },
  passworConfirm: {
    type: String,
    required: [true, ' Please confirm your password']
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
