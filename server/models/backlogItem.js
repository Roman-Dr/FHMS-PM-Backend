var mongoose = require('mongoose');
var schema = mongoose.Schema;

var backlogItemSchema = new schema({
        title: String,
        author: String,
        timestamp: Date,
        assignedTo: mongoose.Schema.Types.ObjectId,
        state: {
            type: String,
            enum: ['New', 'Approved', 'Committed', 'Done', 'Removed'],
            default: 'New'
        },
        description: String,
        sprint: mongoose.Schema.Types.ObjectId,
        project: mongoose.Schema.Types.ObjectId
    },
    {versionKey: false} // DISABLE VERSIONING (_v)
);

module.exports = mongoose.model('BacklogItem', backlogItemSchema);