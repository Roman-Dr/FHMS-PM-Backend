var mongoose = require('mongoose');
var schema = mongoose.Schema;

var planningPokerRoundVoteSchema = new schema({
    voter: mongoose.Schema.Types.ObjectId,
    optimistic: Number,
    realistic: Number,
    pessimistic: Number,
    reason: String
}, { versionKey: false});

var planningPokerRoundSchema = new schema({
    number: Number,
    state: {
        type: String,
        enum: ['Accepted', 'Rejected'],
        default: 'Accepted'
    },
    votes: [planningPokerRoundVoteSchema],
    minEffort: planningPokerRoundVoteSchema,
    maxEffort: planningPokerRoundVoteSchema,
    electedEffort: Number
}, { versionKey: false});

var planningPokerSchema = new schema({
    moderatorId: mongoose.Schema.Types.ObjectId,
    creationDateTime: Date,
    finishDateTime: Date,
    itemId: mongoose.Schema.Types.ObjectId,
    itemType: {
        type: String,
        enum: ['BacklogItem', 'Bug', 'UserStory'],
        default: 'BacklogItem'
    },
    participants: [ mongoose.Schema.Types.ObjectId ],
    rounds: [ planningPokerRoundSchema ],
    effort: Number
}, { versionKey: false});

module.exports = {
    PlanningPoker: mongoose.model('PlanningPoker', planningPokerSchema),
    PlanningPokerRound: mongoose.model('PlanningPokerRound', planningPokerRoundSchema),
    PlanningPokerRoundVote: mongoose.model('PlanningPokerRoundVote', planningPokerRoundVoteSchema)
};