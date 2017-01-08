function ValidationResult() {
    this.result = [];
}

ValidationResult.prototype.add = function(propertyName, message) {
    this.result.push({ propertyName: propertyName, message: message });
};

ValidationResult.prototype.isValid = function() {
    return this.result.length == 0;
};
ValidationResult.prototype.toResult = function() {
    return this.result;
};

module.exports = ValidationResult;