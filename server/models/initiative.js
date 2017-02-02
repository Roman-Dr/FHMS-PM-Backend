var mongoose = require('mongoose');
var schema = mongoose.Schema;

var featureSchema = new schema({
    title: String
    }, {versionKey: false} // DISABLE VERSIONING (_v)
);

var initiativeSchema = new schema({
        title: String,
        projectId: mongoose.Schema.Types.ObjectId,
        startDate: Date,
        endDate: Date,
        description: String,
        goal: String,
        features: [featureSchema]
    }, {versionKey: false} // DISABLE VERSIONING (_v)
);

module.exports = {
    Initiative: mongoose.model('Initiative', initiativeSchema),
    Feature: mongoose.model('Feature', featureSchema)
};