let _secureApp = require('./secureApp');
let securePages = null;
let textService = require('./messages');
let cartPage = require('../pages/cart');
let cart = undefined;
let productPage = require('../pages/product');
let product = undefined;
let modHomePage = require('../pages/index');
let homePage = undefined;
let modHealthLinksPage = require('../pages/healthlinks');
let healthLinksPage = undefined;
let modSearchPage = require('../pages/search');
let searchPage = undefined;

class dynamicPages {

    constructor(server, authService, dataAccessService, utilityService, constantsService) {

        this.dal = dataAccessService;
        this.util = utilityService;
        this.const = constantsService;

        //All views
        server.set('view engine', 'ejs');

        //All Pages
        cart = new cartPage(server, this.dal, this.util, this.const, textService);
        product = new productPage(server, this.dal, this.util, this.const, textService);
        homePage = new modHomePage(server, this.dal, this.util, this.const, textService);
        healthLinksPage = new modHealthLinksPage(server, this.dal, this.util, this.const, textService);
        searchPage = new modSearchPage(server, this.dal, this.util, this.const, textService);

        this.renderErrorPage = this.renderErrorPage.bind(this);
        this.renderStaticPage = this.renderStaticPage.bind(this);

        this.loadRoutes(server);

        securePages = new _secureApp(server, '/secure', this.dal, this.util, this.const, textService, authService);
    }

    loadRoutes(server) {
        server.get('/error', this.renderErrorPage);

        //Static
        server.get('/howtoorder', this.renderStaticPage('../pages/static/howtoplaceorder'));
        server.get('/whyshophere', this.renderStaticPage('../pages/static/whyshophere'));
        server.get('/requestaproduct', this.renderStaticPage('../pages/static/requestaproduct'));
        server.get('/shippingterms', this.renderStaticPage('../pages/static/shippingterms'));
        server.get('/privacypolicy', this.renderStaticPage('../pages/static/privacypolicy'));
        server.get('/terms', this.renderStaticPage('../pages/static/termsandconditions'));
        server.get('/about', this.renderStaticPage('../pages/static/about'));
        server.get('/contact', this.renderStaticPage('../pages/static/contact'));
        return server;
    }

    renderStaticPage(pagePath) {
        return async (req, res) => {
            let pageData = {};
            pageData[this.const.cartItems] = this.util.getCartItemsCount(req);
            res.render(pagePath, await this.util.constructPageData(req.user, pageData, this.dal));
        };
    }

    async renderErrorPage(req, res) {
        let exception = req.flash(this.const.error);
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
        pageData[this.const.error] = exception;
        pageData[this.const.cartItems] = this.util.getCartItemsCount(req);
        res.render('../pages/error', await this.util.constructPageData(req.user, pageData, this.dal));
    }
}

module.exports = dynamicPages;