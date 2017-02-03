var mongoose = require('mongoose');
var schema = mongoose.Schema;

var planningPokerRoundVoteSchema = new schema({
    voterId: mongoose.Schema.Types.ObjectId,
    voterDisplayName: String,
    effort: Number,
    reason: String
}, { versionKey: false});

var planningPokerRoundSchema = new schema({
    number: Number,
    state: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending'
    },
    votesCount: Number,
    votes: [planningPokerRoundVoteSchema],
    electedEffort: Number
}, { versionKey: false});

var planningPokerSchema = new schema({
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    moderator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'BacklogItem' },

    creationDateTime: Date,
    finishDateTime: Date,

    participants: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ],
    rounds: [ planningPokerRoundSchema ],

    activeRound: Number,
    isActive: Boolean,
    isStarted: Boolean,
    effort: Number
}, { versionKey: false});

module.exports = {
    PlanningPoker: mongoose.model('PlanningPoker', planningPokerSchema),
    PlanningPokerRound: mongoose.model('PlanningPokerRound', planningPokerRoundSchema),
    PlanningPokerRoundVote: mongoose.model('PlanningPokerRoundVote', planningPokerRoundVoteSchema)
};