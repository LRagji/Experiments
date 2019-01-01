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
let modPageFAQs = require('../pages/secure/faqs');
let pageFAQs = undefined;
let modPageSettings = require('../pages/secure/appsettings');
let pageSettings = undefined;

class secureapp {
    constructor(_secureApp, basePath, dataAccessService, utilityService, constantsService, textService, authenticationService) {

        pageSuccess = new modPageSuccess(_secureApp, basePath, authenticationService, dataAccessService, utilityService, constantsService);
        pageLogin = new modPageLogin(_secureApp, basePath, authenticationService, dataAccessService, utilityService, constantsService);
        pageProfile = new modPageProfile(_secureApp, basePath, authenticationService, dataAccessService, utilityService, constantsService);
        pagePassword = new modPagePassword(_secureApp, basePath, authenticationService, dataAccessService, utilityService, constantsService);
        pageProducts = new modPageProducts(_secureApp, basePath, authenticationService, dataAccessService, utilityService, constantsService);
        pageOrders = new modPageOrders(_secureApp, basePath, authenticationService, dataAccessService, utilityService, constantsService);
        pageBanner = new modPageBanner(_secureApp, basePath, authenticationService, dataAccessService, utilityService, constantsService);
        pageUser = new modPageUser(_secureApp, basePath, authenticationService, dataAccessService, utilityService, constantsService);
        pageHealthLinks = new modPageApi(_secureApp, basePath, authenticationService, dataAccessService, utilityService, constantsService);
        secureApi = new modSecureApi(_secureApp, basePath, authenticationService, dataAccessService, utilityService, constantsService);
        pageFAQs = new modPageFAQs(_secureApp, basePath, authenticationService, dataAccessService, utilityService, constantsService);
        pageSettings = new modPageSettings(_secureApp, basePath, authenticationService, dataAccessService, utilityService, constantsService);
    }
}

module.exports = secureapp;