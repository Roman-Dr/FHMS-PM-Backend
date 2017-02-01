var mongoose = require('mongoose');
var schema = mongoose.Schema;

var featureSchema = new schema({
    title: String
    }, {versionKey: false} // DISABLE VERSIONING (_v)
);

var initiativeSchema = new schema({
        title: String,
        startDate: Date,
        endDate: Date,
        description: String,
        goal: String,
        features: [featureSchema]
    }, {versionKey: false} // DISABLE VERSIONING (_v)
);

var roadmapSchema = new schema({
        title: String,
        projectId: mongoose.Schema.Types.ObjectId,
        projectDisplayTitle: String,
        roadmapItems: [initiativeSchema]
    }, {versionKey: false} // DISABLE VERSIONING (_v)
);

module.exports = {
    RoadmapItem: mongoose.model('Initiative', initiativeSchema),
    Roadmap: mongoose.model('Roadmap', roadmapSchema),
    Feature: mongoose.model('Feature', featureSchema)
};