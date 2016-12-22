var express = require('express');
var router = express.Router();

var User = require('./../models/user');

router.route('/users')
//
// GET ALL USERS
//
    .get(function (req, res) {
        User.find(function (err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    })
    //
    // CREATE SINGLE USER
    //
    .post(function (req, res) {
        // var newUser = new User(req.body);
        var newUser = new User();

        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        newUser.birthDate = req.body.birthDate;

        newUser.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'New user ' + newUser.displayName() + ' was created!', data: newUser });
        });
    });

router.route('/users/:user_id')
//
// GET SINGLE USER
//
    .get(function (req, res) {
        User.findById(req.params.user_id, function (err, user) {
            if (err)
                res.send(err);

            res.json(user);
        });
    })
    //
    // UPDATE SINGLE USER
    //
    .put(function (req, res) {
        User.findById(req.params.user_id,
            function (err, user) {
                if (err) {
                    console.error(err);

                    return res.sendStatus(404);
                }
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.birthDate = req.body.birthDate;

                user.save(function (err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'User was updated!', data: user });
                });
            });
    })
    //
    // DELETE SINGLE USER
    //
    .delete(function (req, res) {
        User.findByIdAndRemove(req.params.user_id,
            function (deleteErr, deleteRes) {
                if (deleteErr) return console.error(deleteErr);
            });

        return res.json(200);
    });

module.exports = router;