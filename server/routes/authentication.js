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
        res.render('profile.ejs', {
            user : req.user
        });
    });

    // LOGOUT ==============================
    app.get('/api/user/logout', function(req, res) {
        req.logout();
    });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
    // LOGIN ==============================

    // process the login form
    app.post('/api/user/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user) {
            if (err) { return next(err); }
            if (!user) { res.send(401,{ success : false, message : 'authentication failed' }); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.status(200).json("Success");
            });
        })(req, res, next);
    });

    // // SIGNUP =================================

    // process the signup form
    app.post('/api/user/signup', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user) {
            if (err) { return next(err); }
            if (!user) { return res.status(409).json("Conflict"); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.status(201).json("Created");
            });
        })(req, res, next);
    });

    // =============================================================================
    // UNLINK ACCOUNTS =============================================================
    // =============================================================================
    // used to unlink accounts. for social accounts, just remove the token
    // for local account, remove email and password
    // user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
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
    if (req.isAuthenticated())
        return next();
}
