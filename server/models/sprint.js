var mongoose = require('mongoose');
var schema = mongoose.Schema;


var sprintCapacitySchema = new schema({
    userId: mongoose.Schema.Types.ObjectId,
    userDisplayName: String,
    sprintId: mongoose.Schema.Types.ObjectId,
    daysOff: Number,
    capacityPerDay: Number
},
    {versionKey: false}
);

var sprintSchema = new schema({
    sprintName: String,
    startDate: Date,
    endDate: Date,
    projectId: mongoose.Schema.Types.ObjectId,
    projectDisplayName: String,
    sprintCapacity: [sprintCapacitySchema]
},
    {versionKey: false}
    );

module.exports = {
    Sprint: mongoose.model('Sprint', sprintSchema),
    SprintCapacity: mongoose.model('SprintCapacity', sprintCapacitySchema)
};