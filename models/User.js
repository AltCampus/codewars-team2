var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);
const timestamp = require('time-stamp');

var userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    min: 6,
    max: 15,
    required: true
  },
  batch: {
   type: Number,
   required: true
  },
  codewars: {
    type: Object,
  }
})

userSchema.set('timestamps', true);

userSchema.pre('save', function (next) {
    if(this.password && this.isModified('password')){
      this.password = bcrypt.hashSync(this.password, salt)
      next()
    }
})

userSchema.methods.validatePassword = function (password) {
  var result = bcrypt.compareSync(password, this.password);
  return result;
}

var User = mongoose.model('User', userSchema);

module.exports = User;