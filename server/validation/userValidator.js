var mongoose = require('mongoose');

var User =  mongoose.model('User');

var Validator = require('./../validation/validatorHelper');
var ValidationResult = require('./../validation/validationResult');


// Constructor
function UserValidator() {
    this.helper = new Validator();
}

UserValidator.prototype.validate = function(user) {
    var validationResult = new ValidationResult();

    if(!this.helper.isUserIdValid(user._id)) {
        validationResult.add('id', 'Id does not exists.');
    }

    if(!user.email) {
        validationResult.add('email', 'E-Mail must not be null or empty.');
    }
    if(!user.firstname) {
        validationResult.add('firstname', 'First name must not be null or empty.');
    }
    if(!user.lastname) {
        validationResult.add('firstname', 'Last name must not be null or empty.');
    }

    return validationResult;
};

module.exports = UserValidator;