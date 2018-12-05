let passport = require('passport');
let strategy = require('passport-local').Strategy;
let ensureLogin = require('connect-ensure-login');

class authentication {
    constructor(expressApp) {
        passport.use(new strategy(
            function (username, password, cb) {
                //TODO:Implement Login functionality
                console.log("User:" + username + " Pass:" + password + " logged in");
                cb(null, { "User": username });
            }));

        passport.serializeUser(function (user, cb) {
            //TODO:Send only userid, else encrypt the contents.
            cb(null, JSON.stringify(user));
        });

        passport.deserializeUser(function (stringUser, cb) {
            //TODO:receive only userid, else decrypt the contents.
            cb(null, JSON.parse(stringUser));
        });

        expressApp.use(passport.initialize());
        expressApp.use(passport.session());

        this.authenticateLogIn = this.authenticateLogIn.bind(this);
        this.authenticatedInterceptor = this.authenticatedInterceptor.bind(this);
    }

    authenticateLogIn(failurePageRelativPath) {
        return passport.authenticate('local', { failureRedirect: failurePageRelativPath });
    }

    authenticatedInterceptor(loginRelativePath) {
        return ensureLogin.ensureLoggedIn(loginRelativePath);
    }

}
module.exports = authentication;