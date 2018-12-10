let authenticationModule = require('./auth.js');

class secureapp {
    constructor(_secureApp, basePath) {
        let _auth = new authenticationModule(_secureApp);

        // _secureApp.get('/logout',
        //     function (req, res) {
        //         req.logout();
        //         res.redirect('/');
        //     });
        this.basePath = basePath;
        this.securePagePath = "../pages/secure/";
        this.login = this.login.bind(this);
        this.constructDataObject = this.constructDataObject.bind(this);
        this.renderProfile = this.renderProfile.bind(this);
        this.loadRoutes = this.loadRoutes.bind(this);
        this.loadRoutes(_secureApp, basePath, _auth);
    }

    loadRoutes(_secureApp, basePath, _auth) {
        _secureApp.get(basePath + '/login', this.login);
        _secureApp.post(basePath + '/login', _auth.authenticateLogIn("/", this.basePath + "/login"));
        _secureApp.get(basePath + '/profile', _auth.authenticatedInterceptor(basePath + '/login'), this.renderProfile);
    }

    login(req, res) {
        if (req.user) res.redirect("/secure/profile");
        else res.render(this.securePagePath + 'login', this.constructDataObject(req.user, req.flash("error")));
    }

    renderProfile(req, res) {
        res.render(this.securePagePath + 'profile', { user: req.user });
    }

    constructDataObject(user, error) {
        return {
            user: user,
            error: error
        }
    }
}

module.exports = secureapp;