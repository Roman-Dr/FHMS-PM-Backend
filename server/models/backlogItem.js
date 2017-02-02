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
            enum: ['New', 'Done', 'In Progress', 'Removed', 'To Do'],
            default: 'New'
        },
        priority: {
            type: String,
            enum: ['Low', 'Normal', 'High'],
            default: 'Normal'
        },
        remainingWork: Number,
        effort: Number,
        description: String,
        projectId: mongoose.Schema.Types.ObjectId,
        projectDisplayName: String,
        backlogItemId: mongoose.Schema.Types.ObjectId,
        backlogItemDisplayName: String
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
            enum: ['New', 'Approved', 'Committed', 'Done', 'Removed'],
            default: 'New'
        },
        priority: {
            type: String,
            enum: ['Low', 'Normal', 'High'],
            default: 'Normal'
        },
        effort: Number,
        description: String,
        tasks: [taskSchema],
        sprintId: mongoose.Schema.Types.ObjectId,
        sprintDisplayName: String,
        projectId: mongoose.Schema.Types.ObjectId,
        projectDisplayTitle: String,
        userStoryId: mongoose.Schema.Types.ObjectId,
        userStoryDisplayName: String,
        itemType: {
            type: String,
            enum: ['BacklogItem', 'Bug'],
            default: 'BacklogItem'
        }
    }, {versionKey: false} // DISABLE VERSIONING (_v)
);

module.exports = {
    Task: mongoose.model('Task', taskSchema),
    BacklogItem: mongoose.model('BacklogItem', backlogItemSchema)
};