var mongoose = require('mongoose');
var schema = mongoose.Schema;

var projectSchema = new schema({
    displayName: String,
    description: String,
    dueDate: Date,
    owner: mongoose.Schema.Types.ObjectId,
    stakeholders: [mongoose.Schema.Types.ObjectId],
    contributors: [mongoose.Schema.Types.ObjectId]
}, {
    versionKey: false
});

module.exports = mongoose.model('Project', projectSchema);