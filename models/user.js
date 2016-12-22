var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    birthDate: Date
});

UserSchema.methods.displayName = function (cb) {
    return this.firstName + " " + this.lastName;
};

module.exports = mongoose.model('User', UserSchema);