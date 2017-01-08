var mongoose = require('mongoose');
var Project =  mongoose.model('Project');
var moment = require('moment');

var Validator = require('./../validation/validatorHelper');
var ValidationResult = require('./../validation/validationResult');


// Constructor
function ProjectValidator() {
    this.helper = new Validator();
}

ProjectValidator.prototype.validate = function(project) {
    var validationResult = new ValidationResult();


    if(!this.helper.isUserIdValid(project.owner)) {
        validationResult.add('owner', 'Owner does not exists.');
    }

    if(!project.displayName) {
        validationResult.add('displayName', 'DisplayName must not be null or empty.');
    }

    if (!project.dueDate) {
        validationResult.add('dueDate', 'Due date must be not be null.');
    }else {
        if(!moment().isBefore(moment(project.dueDate))) {
            validationResult.add('dueDate', 'Due date must be later than todays date.');
        }
    }

    return validationResult;
};

module.exports = ProjectValidator;