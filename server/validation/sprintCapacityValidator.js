var mongoose = require('mongoose');
var moment = require('moment');

var SprintCapacity = mongoose.model('SprintCapacity');

var Validator = require('./../validation/validatorHelper');
var ValidationResult = require('./../validation/validationResult');


// Constructor
function SprintCapacityValidator() {
    this.helper = new Validator();
}

SprintCapacityValidator.prototype.validate = function (sprintCapacity, callback) {
    var validationResult = new ValidationResult();

    if (!sprintCapacity.daysOff) {
            validationResult.add('daysOff', 'DaysOff muss gesetzt sein');
    }

    if (!sprintCapacity.capacityPerDay) {
        validationResult.add('capacityPerDay', 'Die Kapazität pro Tag muss gesetzt sein.');
    }

    callback(validationResult);
}
;

module.exports = SprintCapacityValidator;
