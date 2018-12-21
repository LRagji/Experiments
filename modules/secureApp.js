let authenticationModule = require('./auth.js');
let utils = require('./utilities');
let constants = require('./constants');
let modPageSuccess = require('../pages/secure/success');
let pageSuccess = undefined;
let modPageLogin = require('../pages/secure/login');
let pageLogin = undefined;

class secureapp {
    constructor(_secureApp, basePath) {
        let _auth = new authenticationModule(_secureApp);
        this.basePath = basePath;
        this.securePagePath = "../pages/secure/";

        this.renderProfile = this.renderProfile.bind(this);
        this.loadRoutes = this.loadRoutes.bind(this);


        pageSuccess = new modPageSuccess(_secureApp, basePath, _auth);
        pageLogin = new modPageLogin(_secureApp, basePath, _auth);

        this.loadRoutes(_secureApp, basePath, _auth);
    }

    loadRoutes(_secureApp, basePath, _auth) {
        _secureApp.get(basePath + '/profile', _auth.authenticatedInterceptor(basePath + '/login'), this.renderProfile);       
    }

    renderProfile(req, res) {
        let pageData = {};
        pageData[constants.cartItems] = utils.getCartItemsCount(req);
        res.render(this.securePagePath + 'profile', utils.constructPageData(req.user, pageData));
    }
}

module.exports = secureapp;