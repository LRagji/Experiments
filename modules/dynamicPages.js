let _secureApp = require('./secureApp');
let securePages = null;
let textService = require('./messages');
let cartPage = require('../pages/cart');
let cart = undefined;
let productPage = require('../pages/product');
let product = undefined;
let modHealthLinksPage = require('../pages/healthlinks');
let healthLinksPage = undefined;
let modSearchPage = require('../pages/search');
let searchPage = undefined;
let modErrorPage = require('../pages/error');
let errorPage = undefined;
let modHealthLibraryPage = require('../pages/healthlibrary');
let healthLibraryPage = undefined;
let page = require('./page');

class dynamicPages extends page {

    constructor(server, authService, dataAccessService, utilityService, constantsService) {

        super(dataAccessService, utilityService, constantsService, textService)
        this.dal = dataAccessService;
        this.util = utilityService;
        this.const = constantsService;

        //All views
        server.set('view engine', 'ejs');

        //TODO: Move all of these page inits to index.js
        cart = new cartPage(server, this.dal, this.util, this.const, textService);
        product = new productPage(server, this.dal, this.util, this.const, textService);
        healthLinksPage = new modHealthLinksPage(server, this.dal, this.util, this.const, textService);
        searchPage = new modSearchPage(server, this.dal, this.util, this.const, textService);
        errorPage = new modErrorPage(server, this.dal, this.util, this.const, textService);
        healthLibraryPage = new modHealthLibraryPage(server, this.dal, this.util, this.const, textService);

        this.loadRoutes(server);

        securePages = new _secureApp(server, '/secure', this.dal, this.util, this.const, textService, authService);
    }

    loadRoutes(server) {
        //Dynamically Static pages
        server.get('/howtoorder', this.safeRenderView('../pages/static/howtoplaceorder'));
        server.get('/whyshophere', this.safeRenderView('../pages/static/whyshophere'));
        server.get('/requestaproduct', this.safeRenderView('../pages/static/requestaproduct'));
        server.get('/shippingterms', this.safeRenderView('../pages/static/shippingterms'));
        server.get('/privacypolicy', this.safeRenderView('../pages/static/privacypolicy'));
        server.get('/terms', this.safeRenderView('../pages/static/termsandconditions'));
        server.get('/about', this.safeRenderView('../pages/static/about'));
        server.get('/contact', this.safeRenderView('../pages/static/contact'));
        server.get('/', this.safeRenderView('../pages/index'));
        return server;
    }
}

module.exports = dynamicPages;