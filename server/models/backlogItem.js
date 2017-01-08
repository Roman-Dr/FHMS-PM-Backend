var mongoose = require('mongoose');
var schema = mongoose.Schema;

var backlogItemSchema = new schema({
        title: String,
        authorId: mongoose.schema.Types.ObjectId,
        authorDisplayName: String,
        timestamp: Date,
        assignedToId: mongoose.Schema.Types.ObjectId,
        assignedToDisplayName: String,
        state: {
            type: String,
            enum: ['New', 'Approved', 'Committed', 'Done', 'Removed'],
            default: 'New'
        },
        description: String,
        sprintId: mongoose.Schema.Types.ObjectId,
        projectId: mongoose.Schema.Types.ObjectId,
        projectDisplayTitle: String
    },
    {versionKey: false} // DISABLE VERSIONING (_v)
);

module.exports = mongoose.model('BacklogItem', backlogItemSchema);