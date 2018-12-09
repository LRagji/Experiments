let passport = require('passport');
let strategy = require('passport-local').Strategy;
let ensureLogin = require('connect-ensure-login');
let flash = require('connect-flash');

class authentication {
    constructor(expressApp) {
        this.authenticateLogIn = this.authenticateLogIn.bind(this);
        this.authenticatedInterceptor = this.authenticatedInterceptor.bind(this);
        this.authenticateLogin = this.authenticateLogin.bind(this);

        passport.use(new strategy(this.authenticateLogin));

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
        expressApp.use(flash());
    }

    authenticateLogIn(successRedirect, failureRedirect) {
        return passport.authenticate('local', { failureRedirect: failureRedirect, successRedirect: successRedirect, failureFlash: true });
    }

    authenticatedInterceptor(loginRelativePath) {
        return ensureLogin.ensureLoggedIn(loginRelativePath);
    }

    authenticateLogin(username, password, done) {
        //TODO:Implement Login functionality

        // User.findOne({ username: username }, function(err, user) {
        //     if (err) { return done(err); }
        //     if (!user) {
        //       return done(null, false, { message: 'Incorrect username.' });
        //     }
        //     if (!user.validPassword(password)) {
        //       return done(null, false, { message: 'Incorrect password.' });
        //     }
        //     return done(null, user);
        //   });

        console.log("User:" + username + " Pass:" + password + " logged in");
        //return done(null, false, { message: 'Incorrect username.' });
        return done(null, { "name": username,"hello":"something" });
    }
}
module.exports = authentication;