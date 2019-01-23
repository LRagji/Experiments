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
let modPageHealthTopics = require('../pages/secure/healthtopics');
let pageHealthTopics = undefined;

class secureapp {
    constructor(_secureApp, basePath, dataAccessService, utilityService, constantsService, textService, authenticationService) {

        //TODO: Move all of these page inits to index.js
        secureApi = new modSecureApi(_secureApp, basePath, authenticationService, dataAccessService, utilityService, constantsService,textService);

        pageOrders = new modPageOrders(_secureApp, basePath, authenticationService, dataAccessService, utilityService, constantsService,textService);
        pageSuccess = new modPageSuccess(_secureApp, basePath, authenticationService, dataAccessService, utilityService, constantsService,textService);
        pageLogin = new modPageLogin(_secureApp, basePath, authenticationService, dataAccessService, utilityService, constantsService,textService);
        pageProfile = new modPageProfile(_secureApp, basePath, authenticationService, dataAccessService, utilityService, constantsService,textService);
        pagePassword = new modPagePassword(_secureApp, basePath, authenticationService, dataAccessService, utilityService, constantsService,textService);

        pageProducts = new modPageProducts(_secureApp, basePath, authenticationService, dataAccessService, utilityService, constantsService,textService);
        pageBanner = new modPageBanner(_secureApp, basePath, authenticationService, dataAccessService, utilityService, constantsService, textService);
        pageUser = new modPageUser(_secureApp, basePath, authenticationService, dataAccessService, utilityService, constantsService,textService);
        pageHealthLinks = new modPageApi(_secureApp, basePath, authenticationService, dataAccessService, utilityService, constantsService,textService);
        pageFAQs = new modPageFAQs(_secureApp, basePath, authenticationService, dataAccessService, utilityService, constantsService,textService);
        pageSettings = new modPageSettings(_secureApp, basePath, authenticationService, dataAccessService, utilityService, constantsService,textService);
        pageHealthTopics = new modPageHealthTopics(_secureApp, basePath, authenticationService, dataAccessService, utilityService, constantsService,textService);
    }
}

module.exports = secureapp;