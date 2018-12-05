let express = require('express');
let _secureApp = new express();
let authenticationModule = require('./auth.js');
let path = require('path');
let _auth = new authenticationModule(_secureApp);

class secureapp {
    constructor() {
        _secureApp.get('/login',
            function (req, res) {
                res.sendFile(path.resolve('./secure/login.html'));
            });

        _secureApp.post('/login',
            _auth.authenticateLogIn("/failure"),
            function (req, res) {
                res.redirect('/secure/profile');
            });

        _secureApp.get('/logout',
            function (req, res) {
                req.logout();
                res.redirect('/');
            });

        _secureApp.get('/profile',
            _auth.authenticatedInterceptor('/secure/login'),
            function (req, res) {
                res.render('profile', { user: req.user });
            });

    }

    initialize() {
        return _secureApp;
    }
}

module.exports = secureapp;