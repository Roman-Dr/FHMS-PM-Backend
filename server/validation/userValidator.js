var mongoose = require('mongoose');

var User =  mongoose.model('User');

var Validator = require('./../validation/validatorHelper');
var ValidationResult = require('./../validation/validationResult');


// Constructor
function UserValidator() {
    this.helper = new Validator();
}

UserValidator.prototype.validate = function(user, callback) {
    var validationResult = new ValidationResult();

    if(!user.email) {
        validationResult.add('email', 'Die E-Mail darf nicht leer sein.');
    }
    if(!user.password) {
        validationResult.add('email', 'Das Passwort darf nicht leer sein.');
    }
    if(!user.firstname) {
        validationResult.add('firstname', 'Der Vorname darf nicht leer sein.');
    }
    if(!user.lastname) {
        validationResult.add('firstname', 'Der Nachname darf nicht leer sein.');
    }

    callback(validationResult);
};

module.exports = UserValidator;