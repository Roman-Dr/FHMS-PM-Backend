var mongoose = require('mongoose');
var schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

var userSchema = new schema({

    email       : String,
    password    : String,
    firstname   : String,
    lastname    : String,
    birthdate   : String
});

userSchema.methods.displayName = function (cb) {
    return this.firstName + " " + this.lastName;
};

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);