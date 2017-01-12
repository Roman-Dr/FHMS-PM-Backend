var mongoose = require('mongoose');
var moment = require('moment');

var Sprint = mongoose.model('Sprint');

var Validator = require('./../validation/validatorHelper');
var ValidationResult = require('./../validation/validationResult');


// Constructor
function SprintValidator() {
    this.helper = new Validator();
}

SprintValidator.prototype.validate = function (sprint, callback) {
    var validationResult = new ValidationResult();

    if (!sprint.sprintName) {
        validationResult.add('sprintName', 'Der Name darf nicht leer sein.');
    }

    if (!sprint.startDate) {
        validationResult.add('startDate', 'Das Startdatum muss gesetzt werden.');
    }

    if (!sprint.endDate) {
        validationResult.add('endDate', 'Das Enddatum muss gesetzt werden.');
    }

    callback(validationResult);
}
;

module.exports = SprintValidator;
