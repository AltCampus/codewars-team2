var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);

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
    codewars: {
        type: Object,
    }
}, { timestamp: true })

userSchema.pre('save', function (next) {
    if(this.password){
        this.password = bcrypt.hashSync(this.password, salt)
    }
    next()
})

// userSchema.methods.validatePassword = function (password) {
//     return bcrypt.compareSync(password, this.password)
// }

var User = mongoose.model('User', userSchema);

module.exports = User;