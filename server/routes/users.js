var express = require('express');
var router = express.Router();

var User = require('./../models/user');

router.route('/user')
    /**
     * @api {get} /user/ Get all users.
     * @apiName GetUsers
     * @apiGroup Benutzerverwaltung
     *
     * @apiSuccess {User[]} users List of users.
     * @apiSuccess {ObjectId} users.id Users unique identifier.
     * @apiSuccess {String} users.firstName First name of the user.
     * @apiSuccess {String} users.lastName Last name of the user.
     * @apiSuccess {Date} users.birthDate Date of birth of the user.
     */
    .get(function (req, res) {
        User.find(function (err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    })
    /**
     * @api {post} /user/ Create a new single user.
     * @apiName AddUser
     * @apiGroup Benutzerverwaltung
     *
     * @apiParam {String} firstName First name of the user.
     * @apiParam {String} lastName Last name of the user.
     * @apiParam {Date} birthDate Date of birth of the user.
     *
     * @apiSuccess {ObjectId} id Users unique identifier.
     * @apiSuccess {String} firstName First name of the user.
     * @apiSuccess {String} lastName Last name of the user.
     * @apiSuccess {Date} birthDate Date of birth of the user.
     *
     */
    .post(function (req, res) {
        // var newUser = new User(req.body);
        var newUser = new User();

        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        newUser.birthDate = req.body.birthDate;

        newUser.save(function (err) {
            if (err)
                res.send(err);

            res.json(newUser);
        });
    });

router.route('/user/users/:user_id')
    /**
     * @api {get} /user/:id Retrieve an existing user by his id.
     * @apiName GetUser
     * @apiGroup Benutzerverwaltung
     *
     * @apiParam {ObjectId} id Users unique identifier.
     *
     * @apiSuccess {ObjectId} id Users unique identifier.
     * @apiSuccess {String} firstName First name of the user.
     * @apiSuccess {String} lastName Last name of the user.
     * @apiSuccess {Date} birthDate Date of birth of the user.
     *
     */
    .get(function (req, res) {
        User.findById(req.params.user_id, function (err, user) {
            if (err)
                res.send(err);

            res.json(user);
        });
    })
    /**
     * @api {put} /user/:id Update an existing user.
     * @apiName UpdateUser
     * @apiGroup Benutzerverwaltung
     *
     * @apiParam {ObjectId} id Users unique identifier.
     * @apiParam {String} firstName First name of the user.
     * @apiParam {String} lastName Last name of the user.
     * @apiParam {Date} birthDate Date of birth of the user.
     *
     * @apiSuccess {ObjectId} id Users unique identifier.
     * @apiSuccess {String} firstName First name of the user.
     * @apiSuccess {String} lastName Last name of the user.
     * @apiSuccess {Date} birthDate Date of birth of the user.
     *
     */
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

                    res.json(user);
                });
            });
    })
    /**
     * @api {delete} /user/:id Delete an existing user.
     * @apiName DeleteUser
     * @apiGroup Benutzerverwaltung
     *
     * @apiParam {ObjectId} id Users unique identifier.
     *
     */
    .delete(function (req, res) {
        User.findByIdAndRemove(req.params.user_id,
            function (deleteErr, deleteRes) {
                if (deleteErr) return console.error(deleteErr);
            });

        return res.json(200);
    });

module.exports = router;