const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: type
  },
  password: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const User = mongoose.model('User',userSchema);

module.exports = User;

