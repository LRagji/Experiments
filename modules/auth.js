let passport = require('passport');
let strategy = require('passport-local').Strategy;
let ensureLogin = require('connect-ensure-login');

class authentication {

    constructor(expressApp, dataAccessService, utilityService, constantsService) {
        this.dal = dataAccessService;
        this.util = utilityService;
        this.const = constantsService;

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
            if (this.util.validateEmail(username) === false) {
                return done(null, false, { message: 'Not a valid email ' + username });
            }

            if (this.util.validateLength(password, 50, 1) === false) {
                return done(null, false, { message: 'Password fails length validation [50,1] ' + username });
            }

            let user = await this.dal.getUserByEmail(username)
            if (user !== undefined) {
                if (user.meta.status === "active") {
                    if (user.password === this.util.getHash(password)) {
                        console.info(username + ' logged in.');
                        return done(null, user);
                    }
                    else {
                        console.warn('Invalid password for ' + username);
                        return done(null, false, { message: 'Invalid password for ' + username });
                    }
                }
                else {
                    console.warn('User(' + user.id + ') is not active in system(' + user.meta.status + ')');
                    return done(null, false, { message: 'User(' + user.id + ') is not active in system(' + user.meta.status + ')' });
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