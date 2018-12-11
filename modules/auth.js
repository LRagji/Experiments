let passport = require('passport');
let strategy = require('passport-local').Strategy;
let ensureLogin = require('connect-ensure-login');
let flash = require('connect-flash');
let hash = require('object-hash');
let pgDal = require('../db/dataAccessLayer');
let dal = new pgDal();

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
        dal.getUserByEmail(username).then((user) => {
            if (user !== undefined) {
                if (user.password === hash(password, { algorithm: 'md5' })) {
                    console.info(username + ' logged in.');
                    return done(null, user);
                }
                else {
                    console.warn('Invalid password for ' + username);
                    return done(null, false, { message: 'Invalid password for ' + username });
                }
            }
            else {
                console.warn('No user exits with ' + username);
                return done(null, false, { message: 'No User exits with ' + username });
            }
        }).catch((err) => {
            console.error("Error while login for " + username);
            console.error(err);
            return done(null, false, { message: 'System error while logging in for ' + username });
        });
    }
}
module.exports = authentication;