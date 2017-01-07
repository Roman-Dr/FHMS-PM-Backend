var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userStorySchema = new schema({
    title: String,
    authorId: mongoose.Schema.Types.ObjectId,
    authorDisplayName: String,
    complete: Boolean,
    creationDate: Date
    });

var projectSchema = new schema({
    displayName: String,
    description: String,
    dueDate: Date,
    owner: mongoose.Schema.Types.ObjectId,
    stakeholders: [mongoose.Schema.Types.ObjectId],
    contributors: [mongoose.Schema.Types.ObjectId],
    userStories: [ userStorySchema ]
}, { versionKey: false});

module.exports = mongoose.model('Project', projectSchema);
module.exports = mongoose.model('UserStory', userStorySchema);