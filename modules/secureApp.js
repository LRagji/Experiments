let authenticationModule = require('./auth.js');
let utils = require('./utilities');
let constants = require('./constants');

class secureapp {
    constructor(_secureApp, basePath) {
        let _auth = new authenticationModule(_secureApp);
        this.basePath = basePath;
        this.securePagePath = "../pages/secure/";
        this.renderLoginPage = this.renderLoginPage.bind(this);
        this.renderProfile = this.renderProfile.bind(this);
        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderLogout = this.renderLogout.bind(this);
        this.loadRoutes(_secureApp, basePath, _auth);
    }

    loadRoutes(_secureApp, basePath, _auth) {
        _secureApp.get(basePath + '/login', this.renderLoginPage);
        _secureApp.post(basePath + '/login', _auth.authenticateLogIn("/", this.basePath + "/login"));
        _secureApp.get(basePath + '/profile', _auth.authenticatedInterceptor(basePath + '/login'), this.renderProfile);
        _secureApp.get(basePath + '/logout', _auth.authenticatedInterceptor(basePath + '/login'), this.renderLogout);
    }

    renderLoginPage(req, res) {
        if (req.user) {
            res.redirect("/secure/profile");
        }
        else {
            var pageData = {};
            pageData[constants.error] = req.flash("error");
            res.render(this.securePagePath + 'login', utils.constructPageData(req.user, pageData));
        }
    }

    renderProfile(req, res) {
        res.render(this.securePagePath + 'profile', { user: req.user });
    }

    renderLogout(req, res) {
        req.logout();
        res.redirect(this.basePath + '/login');
    }

    constructDataObject(user, error) {
        return {
            user: user,
            error: error
        }
    }
}

module.exports = secureapp;