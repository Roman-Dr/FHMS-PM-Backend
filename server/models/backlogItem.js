var mongoose = require('mongoose');
var schema = mongoose.Schema;

var taskSchema = new schema({
        title: String,
        authorId: mongoose.Schema.Types.ObjectId,
        authorDisplayName: String,
        creationDate: Date,
        assignedToId: mongoose.Schema.Types.ObjectId,
        assignedToDisplayName: String,
        state: {
            type: String,
            enum: ['Done', 'In Progress', 'Removed', 'To Do'],
            default: 'New'
        },
        priority: Number,
        effort: Number,
        description: String
    }, {versionKey: false}
);

var backlogItemSchema = new schema({
        title: String,
        authorId: mongoose.Schema.Types.ObjectId,
        authorDisplayName: String,
        creationDate: Date,
        assignedToId: mongoose.Schema.Types.ObjectId,
        assignedToDisplayName: String,
        state: {
            type: String,
            enum: ['New', 'Approved', 'Committed', 'Done', 'Removed'], //TODO: An Scrumboard anpassen
            default: 'New'
        },
        priority: Number,
        effort: Number,
        description: String,
        tasks: [taskSchema],
        sprintId: mongoose.Schema.Types.ObjectId,
        projectId: mongoose.Schema.Types.ObjectId,
        projectDisplayTitle: String,
        userStoryId: mongoose.Schema.Types.ObjectId,
        userStoryDisplayName: String
    }, {versionKey: false} // DISABLE VERSIONING (_v)
);

module.exports = {
    Task: mongoose.model('Task', taskSchema),
    BacklogItem: mongoose.model('BacklogItem', backlogItemSchema)
};