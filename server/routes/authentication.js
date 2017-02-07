var mongoose = require('mongoose');
var UserValidator = require('./../validation/userValidator');
var User = mongoose.model('User');

module.exports = function(app, passport) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/api/user/profile', isLoggedIn, function(req, res) {
        return res.status(200).json("Success");
    });


    /**
     * @api {get} /user/logout/ User Logout.
     * @apiName Logout
     * @apiGroup Benutzerverwaltung
     *
     * @apiSuccess {StatusCode} StatusCode 200 for successful logout.
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *      {
     *          "Logout was successful!"
     *      }
     */
    app.get('/api/user/logout', function(req, res) {
        req.logout();
        return res.status(200).json("Logout was successful!");
    });


    /**
     * @api {post} /user/login/ User Login.
     * @apiName Login
     * @apiGroup Benutzerverwaltung
     *
     * @apiParam {String} email Email of the user.
     * @apiParam {String} password Password of the user.
     *
     * @apiSuccess {StatusCode} StatusCode 200 for successful login.
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *      {
     *          "Login was successful!"
     *      }
     *
     * @apiError {StatusCode} StatusCode 401 for failed authentication.
     */
    app.post('/api/user/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user) {
            if (err) { return next(err); }
            if (!user) { return res.status(401).json("Unauthorized!"); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.status(200).json(user.id);
            });
        })(req, res, next);
    });


    /**
     * @api {post} /user/signup/ User Signup.
     * @apiName Signup
     * @apiGroup Benutzerverwaltung
     *
     * @apiParam {String} email Email of the user.
     * @apiParam {String} password Password of the user.
     * @apiParam {String} firstname Firstname of the user.
     * @apiParam {String} lastname Lastname of the user.
     * @apiParam {Date} birthdate Birthdate of the user.
     *
     * @apiSuccess {StatusCode} StatusCode 201 for creating an Account successfully..
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *      {
     *          "Creating an Account was successful!"
     *      }
     *
     * @apiError {StatusCode} StatusCode 409 for failed signup.
     */
    app.post('/api/user/signup', function(req, res, next) {
        var validator = new UserValidator();
        validator.validate(req.body, function(validationResult){
            if(!validationResult.isValid()){
                return res.status(460).send(validationResult.toResult());
            }else {
                passport.authenticate('local-signup', function(err, user) {
                    if (err) { return next(err); }
                    if (!user) { return res.status(409).json("Conflict"); }
                    req.logIn(user, function(err) {
                        if (err) { return next(err); }
                        return res.status(201).json("Creating an Account was successful!");
                    });
                })(req, res, next);
            }
        });
    });

    // =============================================================================
    // UNLINK ACCOUNTS =============================================================
    // =============================================================================
    // used to unlink accounts. for social accounts, just remove the token
    // for local account, remove email and password
    // user account will stay active in case they want to reconnect in the future

    /**
     * @api {get} /user/unlink/ Unlink User Account.
     * @apiName Unlink
     * @apiGroup Benutzerverwaltung
     *
     * @apiParam {ObjectId} id Unique identifier of the user.
     *
     * @apiSuccess {StatusCode} StatusCode 200 for unlinking an Account successfully.
     *
     * @apiError {StatusCode} StatusCode 409 for failed signup.
     */
    app.get('/api/user/unlink', isLoggedIn, function(req, res) {
        User.findById(req.body.id, function(err, user) {
            if (err){
                return res.send(err);
            }
            user.email = undefined;
            user.password = undefined;
            user.firstname = undefined;
            user.lastname = undefined;
            user.birthdate = undefined;
            user.save();
            return res.status(200).json("Success");
        });
    });


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    return res.status(400).json("User ist not logged in!");
}
