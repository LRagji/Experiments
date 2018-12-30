let _secureApp = require('./secureApp');
let pgdal = require('../db/dataAccessLayer');
let dal = new pgdal();
let securePages = null;
let constants = require('./constants');
let utils = require('./utilities');
let textService = require('./messages');
let cartPage = require('../pages/cart');
let cart = undefined;
let productPage = require('../pages/product');
let product = undefined;
let modHomePage = require('../pages/index');
let homePage = undefined;
let modHealthLinksPage = require('../pages/healthlinks');
let healthLinksPage = undefined;

class dynamicPages {

    constructor(server) {
        //All views
        server.set('view engine', 'ejs');

        //All Pages
        securePages = new _secureApp(server, '/secure', dal, utils, constants);//This has to be the first one for pass the user login. Donot change the sequence.
        cart = new cartPage(server);
        product = new productPage(server, dal, utils, constants, textService);
        homePage = new modHomePage(server, dal, utils, constants, textService);
        healthLinksPage = new modHealthLinksPage(server, dal, utils, constants, textService);

        this.renderErrorPage = this.renderErrorPage.bind(this);
        this.renderHowToPlaceOrder = this.renderHowToPlaceOrder.bind(this);
        this.renderWhyShopHere = this.renderWhyShopHere.bind(this);
        this.renderRequestAProduct = this.renderRequestAProduct.bind(this);
        this.renderShippingTerms = this.renderShippingTerms.bind(this);
        this.renderPrivacyPolicy = this.renderPrivacyPolicy.bind(this);
        this.renderTermsAndConditions = this.renderTermsAndConditions.bind(this);
        this.renderAboutUs = this.renderAboutUs.bind(this);
        this.renderContactUs = this.renderContactUs.bind(this);

        this.loadRoutes(server);
    }

    loadRoutes(server) {
        server.get('/error', this.renderErrorPage);

        //Static
        server.get('/howtoorder', this.renderHowToPlaceOrder);
        server.get('/whyshophere', this.renderWhyShopHere);
        server.get('/requestaproduct', this.renderRequestAProduct);
        server.get('/shippingterms', this.renderShippingTerms);
        server.get('/privacypolicy', this.renderPrivacyPolicy);
        server.get('/terms', this.renderTermsAndConditions);
        server.get('/about', this.renderAboutUs);
        server.get('/contact', this.renderContactUs);
        return server;
    }

    async renderHowToPlaceOrder(req, res) {
        let pageData = {};
        pageData[constants.cartItems] = utils.getCartItemsCount(req);
        res.render('../pages/static/howtoplaceorder', await utils.constructPageData(req.user, pageData, dal));
    }

    async renderWhyShopHere(req, res) {
        let pageData = {};
        pageData[constants.cartItems] = utils.getCartItemsCount(req);
        res.render('../pages/static/whyshophere', await utils.constructPageData(req.user, pageData, dal));
    }

    async renderRequestAProduct(req, res) {
        let pageData = {};
        pageData[constants.cartItems] = utils.getCartItemsCount(req);
        res.render('../pages/static/requestaproduct', await utils.constructPageData(req.user, pageData, dal));
    }

    async renderShippingTerms(req, res) {
        let pageData = {};
        pageData[constants.cartItems] = utils.getCartItemsCount(req);
        res.render('../pages/static/shippingterms', await utils.constructPageData(req.user, pageData, dal));
    }

    async renderPrivacyPolicy(req, res) {
        let pageData = {};
        pageData[constants.cartItems] = utils.getCartItemsCount(req);
        res.render('../pages/static/privacypolicy', await utils.constructPageData(req.user, pageData, dal));
    }

    async renderTermsAndConditions(req, res) {
        let pageData = {};
        pageData[constants.cartItems] = utils.getCartItemsCount(req);
        res.render('../pages/static/termsandconditions', await utils.constructPageData(req.user, pageData, dal));
    }

    async renderAboutUs(req, res) {
        let pageData = {};
        pageData[constants.cartItems] = utils.getCartItemsCount(req);
        res.render('../pages/static/about', await utils.constructPageData(req.user, pageData, dal));
    }

    async renderContactUs(req, res) {
        let pageData = {};
        pageData[constants.cartItems] = utils.getCartItemsCount(req);
        res.render('../pages/static/contact', await utils.constructPageData(req.user, pageData, dal));
    }

    async renderErrorPage(req, res) {
        let exception = req.flash(constants.error);
        if (exception.length <= 0) {
            //This is the case when user directly request for a error page
            exception.push(new Error("Unknown Error"));
        }
        else {
            exception.forEach(err => {
                console.error('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                console.error(err);
                console.error('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
            });

        }
        let pageData = {};
        pageData[constants.error] = exception;
        pageData[constants.cartItems] = utils.getCartItemsCount(req);
        res.render('../pages/error', await utils.constructPageData(req.user, pageData, dal));
    }
}

module.exports = dynamicPages;