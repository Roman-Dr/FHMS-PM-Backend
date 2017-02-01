var mongoose = require('mongoose');
var schema = mongoose.Schema;

var featureSchema = new schema({
    title: String
    }, {versionKey: false} // DISABLE VERSIONING (_v)
);

var roadmapItemSchema = new schema({
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
        roadmapItems: [roadmapItemSchema]
    }, {versionKey: false} // DISABLE VERSIONING (_v)
);

module.exports = {
    RoadmapItem: mongoose.model('RoadmapItem', roadmapItemSchema),
    Roadmap: mongoose.model('Roadmap', roadmapSchema),
    Feature: mongoose.model('Feature', featureSchema)
};