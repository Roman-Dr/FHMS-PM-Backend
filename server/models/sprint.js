var mongoose = require('mongoose');
var schema = mongoose.Schema;


var sprintCapacitySchema = new schema({
    userId: mongoose.Schema.Types.ObjectId,
    userDisplayName: String,
    sprintId: mongoose.Schema.Types.ObjectId,
    daysOff: Number,
    capacityPerDay: Number
}, {versionKey: false});

var sprintBurnDownMeasureSchema = new schema({
    dateOfMeasurement: Date,
    remainingWorkTillNow: Number
}, {versionKey: false});

var sprintRetrospectiveSchema = new schema({
    userId: mongoose.Schema.Types.ObjectId,
    userDisplayName: String,
    comment: String
}, {versionKey: false});

var sprintSchema = new schema({
    sprintName: String,
    startDate: Date,
    endDate: Date,
    effort: Number,
    remainingWork: Number,
    projectId: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
    projectDisplayName: String,
    sprintCapacity: [sprintCapacitySchema],
    sprintBurnDownMeasures: [sprintBurnDownMeasureSchema],
    retrospective: [sprintRetrospectiveSchema]
}, {versionKey: false});

module.exports = {
    Sprint: mongoose.model('Sprint', sprintSchema),
    SprintCapacity: mongoose.model('SprintCapacity', sprintCapacitySchema),
    SprintBurnDownMeasure: mongoose.model('SprintBurnDownMeasure', sprintBurnDownMeasureSchema),
    SprintRetrospective: mongoose.model('SprintRetrospective', sprintRetrospectiveSchema)
};