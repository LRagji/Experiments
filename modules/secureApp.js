let authenticationModule = require('./auth.js');
let utils = require('./utilities');
let constants = require('./constants');
let modPageSuccess = require('../pages/secure/success');
let pageSuccess = undefined;
let modPageLogin = require('../pages/secure/login');
let pageLogin = undefined;
let modPageProfile = require('../pages/secure/profile');
let pageProfile = undefined;
let modPagePassword = require('../pages/secure/password');
let pagePassword = undefined;
let modPageProducts = require('../pages/secure/products');
let pageProducts = undefined;
let modPageOrders = require('../pages/secure/orders');
let pageOrders = undefined;
let modPageBanner = require('../pages/secure/bannermanagement');
let pageBanner = undefined;
let modPageUser = require('../pages/secure/usermanagement');
let pageUser = undefined;
let modSecureApi = require('../pages/secure/secureAPI');
let secureApi = undefined;
let modPageApi = require('../pages/secure/healthlinks');
let pageHealthLinks = undefined;

class secureapp {
    constructor(_secureApp, basePath, dataAccessService, utilityService, constantsService) {
        let _auth = new authenticationModule(_secureApp);
        this.basePath = basePath;
        this.securePagePath = "../pages/secure/";

        pageSuccess = new modPageSuccess(_secureApp, basePath, _auth);
        pageLogin = new modPageLogin(_secureApp, basePath, _auth);
        pageProfile = new modPageProfile(_secureApp, basePath, _auth, dataAccessService, utilityService, constantsService);
        pagePassword = new modPagePassword(_secureApp, basePath, _auth, dataAccessService, utilityService, constantsService);
        pageProducts = new modPageProducts(_secureApp, basePath, _auth, dataAccessService, utilityService, constantsService);
        pageOrders = new modPageOrders(_secureApp, basePath, _auth, dataAccessService, utilityService, constantsService);
        pageBanner = new modPageBanner(_secureApp, basePath, _auth, dataAccessService, utilityService, constantsService);
        pageUser = new modPageUser(_secureApp, basePath, _auth, dataAccessService, utilityService, constantsService);
        pageHealthLinks = new modPageApi(_secureApp, basePath, _auth, dataAccessService, utilityService, constantsService);
        secureApi = new modSecureApi(_secureApp, basePath, _auth, dataAccessService, utilityService, constantsService);
    }
}

module.exports = secureapp;