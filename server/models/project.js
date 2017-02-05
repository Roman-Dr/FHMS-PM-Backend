var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userStorySchema = new schema({
    role: String,
    feature: String,
    benefit: String,
    authorId: mongoose.Schema.Types.ObjectId,
    authorDisplayName: String,
    complete: Boolean,
    creationDate: Date
}, { versionKey: false});

var projectSchema = new schema({
    displayName: String,
    description: String,
    dueDate: Date,
    owner: mongoose.Schema.Types.ObjectId,
    stakeholders: [mongoose.Schema.Types.ObjectId],
    contributors: [mongoose.Schema.Types.ObjectId],
    userStories: [ userStorySchema ]
}, { versionKey: false});

module.exports = {
    Project: mongoose.model('Project', projectSchema),
    UserStory: mongoose.model('UserStory', userStorySchema)
};