let passport = require('passport');
let strategy = require('passport-local').Strategy;
let ensureLogin = require('connect-ensure-login');
let pgDal = require('../db/dataAccessLayer');
let dal = new pgDal();
let utils = require('./utilities');

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
    }

    authenticateLogIn(failureRedirect) {
        return passport.authenticate('local', { failureRedirect: failureRedirect, failureFlash: true });
    }

    authenticatedInterceptor(loginRelativePath) {
        return ensureLogin.ensureLoggedIn(loginRelativePath);
    }

    async authenticateLogin(username, password, done) {
        try {
            if (utils.validateEmail(username) === false) {
                return done(null, false, { message: 'Not a valid email ' + username });
            }

            if (utils.validateLength(password,50,1) === false) {
                return done(null, false, { message: 'Password fails length validation [50,1] ' + username });
            }

            let user = await dal.getUserByEmail(username)
            if (user !== undefined) {
                if (user.password === utils.getHash(password)) {
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
        }
        catch (err) {
            console.error("Error while login for " + username);
            console.error(err);
            return done(null, false, { message: 'System error while logging in for ' + username });
        };
    }
}
module.exports = authentication;