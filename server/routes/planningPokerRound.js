var express = require('express');
var mongoose = require('mongoose');
var moment = require('moment');

var router = express.Router();

var PlanningPoker =  mongoose.model('PlanningPoker');
var PlanningPokerRound =  mongoose.model('PlanningPokerRound');
var PlanningPokerRoundVote =  mongoose.model('PlanningPokerRoundVote');

router.route('/projects/:project_id/planningPokers/:planning_poker_id/rounds')
    .post(function(req, res){
        PlanningPoker.findById(req.params.planning_poker_id, function(err, planningPoker){
            var newItem = new PlanningPokerRound();

            newItem.number = planningPoker.rounds.length + 1;
            newItem.state = 'Pending';
            newItem.electedEffort = 0;

            planningPoker.activeRound = newItem.number;
            planningPoker.rounds.push(newItem);

            planningPoker.save(function (err) {
                if (err) {
                    console.error(err);
                    return res.send(err);
                }

                return res.json(newItem);
            });
        });
    });

router.route('/projects/:project_id/planningPokers/:planning_poker_id/rounds/:planning_poker_round_id/votes')
    .post(function (req, res) {
        PlanningPoker.findById(req.params.planning_poker_id, function(err, planningPoker){

            var planningPokerRound = planningPoker.rounds[planningPoker.activeRound-1];

            var newItem = new PlanningPokerRoundVote();

            newItem.voter = req.body.voter;
            newItem.effort = req.body.effort;
            newItem.reason = "";

            planningPokerRound.votes.push(newItem);

            planningPokerRound.votesCount = planningPokerRound.votes.length;

            planningPoker.save(function (err) {
                if (err) {
                    console.error(err);
                    return res.send(err);
                }

                return res.json(newItem);
            });
        });
    });


module.exports = router;