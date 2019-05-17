var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')

var userSchema = new Schema ({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        min: 6,
        max: 15,
        required: true
    },
    codewars: [{
        type: Object,  
    }]
}, {timestamp: true})

userSchema.pre('save', function (next) {
    var salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt)
    console.log(this.password)
    next()
})

// userSchema.methods.validatePassword = function (password) {
//     return bcrypt.compareSync(password, this.password)
// }

var User = mongoose.model('User', userSchema);

module.exports = User;