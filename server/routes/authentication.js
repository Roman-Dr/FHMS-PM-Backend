/**
 * Created by michelehmen on 23.12.16.
 */
module.exports = function(app, passport) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/api/user/profile', isLoggedIn, function(req, res) {
        return res.status(200);
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
            if (!user) { res.send(401,{ success : false, message : 'authentication failed' }); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.status(200).json("Login was successful!");
            });
        })(req, res, next);
    });


    /**
     * @api {post} /user/signup/ User Signup.
     * @apiName Signup
     * @apiGroup Benutzerverwaltung
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
        passport.authenticate('local-signup', function(err, user) {
            if (err) { return next(err); }
            if (!user) { return res.status(409).json("Conflict"); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.status(201).json("Creating an Account was successful!");
            });
        })(req, res, next);
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
     * @apiSuccess {StatusCode} StatusCode 200 for unlinking an Account successfully.
     *
     * @apiError {StatusCode} StatusCode 409 for failed signup.
     */
    app.get('/api/user/unlink', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.email    = undefined;
        user.password = undefined;
        user.save();
        return res.status(200).json("Success");
    });


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    return res.status(400);
}
