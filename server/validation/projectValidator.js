var mongoose = require('mongoose');
var Project =  mongoose.model('Project');
var moment = require('moment');

var Validator = require('./../validation/validatorHelper');
var ValidationResult = require('./../validation/validationResult');


// Constructor
function ProjectValidator() {
    this.helper = new Validator();
}

ProjectValidator.prototype.validate = function(project, callback) {
    this.helper.isUserIdValid(project.owner, function(isUserValid) {
        var validationResult = new ValidationResult();

        if(!isUserValid) {
            validationResult.add('owner', 'Die Id für den Besitzer ist ungültig.');
        }

        if(!project.displayName) {
            validationResult.add('displayName', 'Die Bezeichnung darf nicht leer sein.');
        }

        if (!project.dueDate) {
            validationResult.add('dueDate', 'Das Fälligkeitsdatum muss gesetzt werden.');
        }else {
            if(!moment().isBefore(moment(project.dueDate))) {
                validationResult.add('dueDate', 'Das Fälligkeitsdatum muss in der Zukunft liegen.');
            }
        }

        callback(validationResult);
    });
};

module.exports = ProjectValidator;