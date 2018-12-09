let express = require('express');
let _secureApp = new express();
let authenticationModule = require('./auth.js');
let path = require('path');
let _auth = new authenticationModule(_secureApp);

class secureapp {
    constructor() {
        _secureApp.set('view engine', 'ejs');

        _secureApp.get('/logout',
            function (req, res) {
                req.logout();
                res.redirect('/');
            });

        this.login = this.login.bind(this);
        this.constructDataObject = this.constructDataObject.bind(this);
        this.renderProfile = this.renderProfile.bind(this);

        _secureApp.get('/login', this.login);
        _secureApp.post('/login', _auth.authenticateLogIn("/secure/profile", "/secure/login"));
        _secureApp.get('/profile', _auth.authenticatedInterceptor('/secure/login'), this.renderProfile);
    }

    initialize() {
        return _secureApp;
    }

    login(req, res) {
        if (req.user) res.redirect("/secure/profile");
        else res.render('../secure/login', this.constructDataObject(req.user, req.flash("error")));
    }

    renderProfile(req, res) {
        res.render('../secure/profile', { user: req.user });
    }

    constructDataObject(user, error) {
        return {
            user: user,
            error: error
        }
    }
}

module.exports = secureapp;