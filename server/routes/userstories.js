var express = require('express');
var router = express.Router();
var UserStory = require('./../models/userstory');

router.route('/userstories')
//
// GET ALL USERSSTORYS
//
    .get(function (req, res) {
        UserStory.find(function (err, userstories) {
            if (err)
                res.send(err);
            console.log('Alle User Stories wurden per GET aufgerufen');
            res.json(userstories);
        });
    })

    //
    // CREATE SINGLE USERSSTORY
    //
    .post(function (req, res) {
        var newUserStory = new UserStory();

        newUserStory.title = req.body.title;
        newUserStory.author = req.body.author;
        newUserStory.complete = req.body.complete;
        newUserStory.timestmp = req.body.timestmp;

        newUserStory.save(function (err) {
            if (err) {
                console.error(err);
                return res.send(err);
            }
            console.log('Eine neue User Stories wurde angelegt');
            res.json({message: 'New story ' + newUserStory.displayTitle() + ' was created!', data: newUserStory});
        });
    });

router.route('/userstory/:id')
//
// GET SINGLE USERSSTORY
//
    .get(function (req, res) {
        User.findById(req.params.id, function (err, userstory) {
            if (err) {
                console.error(err);
                return res.send(err);
            }
            console.log('Eine User Stories wurde aufgerufen');
            res.json(userstory);
        });
    })

    //
    // UPDATE SINGLE USERSSTORY
    //
    .put(function (req, res) {
        User.findById(req.params.id,
            function (err, userstory) {
                if (err) {
                    console.error(err);

                    return res.sendStatus(404);
                }
                newUserStory.title = req.body.title;
                newUserStory.author = req.body.author;
                newUserStory.complete = req.body.complete;
                newUserStory.timestmp = req.body.timestmp;

                user.save(function (err) {
                    if (err) {
                        console.error(err);
                        return res.send(err);
                    }
                    console.log('Eine User Stories wurde aktualisiert');
                    res.json({message: 'Userstory was updated!', data: userstory});
                });
            });
    })

    //
    // DELETE SINGLE USERSSTORY
    //
    .delete(function (req, res) {
        User.findByIdAndRemove(req.params.id,
            function (err, deleteRes) {
                if (err) {
                    console.error(err);
                    return res.send(err);
                }
                console.log('Eine User Stories wurde gelöscht');
            });
        return res.json(200);
    });

module.exports = router;