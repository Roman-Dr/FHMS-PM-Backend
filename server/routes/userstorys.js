var express = require('express');
var router = express.Router();

var UserStory = require('./../models/userstory');


router.route('/userstorys')
//
// GET ALL USERSSTORYS
//
    .get(function (req, res) {
        UserStory.find(function (err, userstorys) {
            if (err)
                res.send(err);

            res.json(userstorys);
        });
    })
    //
    // CREATE SINGLE USERSSTORY
    //
    .post(function (req, res) {
        var newUserStory = new UserStory();

        newUserStory.title = req.body.title;
        newUserStory.autor = req.body.autor;
        newUserStory.complete = req.body.complete;
        newUserStory.timestmp = req.body.timestmp;

        newUserStory.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'New story ' + newUserStory.displayTitle() + ' was created!', data: newUserStory });
        });
    });



module.exports = router;