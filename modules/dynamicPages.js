let _secureApp = require('./secureApp');
let pgdal = require('../db/dataAccessLayer');
let dal = new pgdal();
let securePages = null;
let constants = require('./constants');
let utils = require('./utilities');
let textService = require('./messages');

class dynamicPages {

    constructor(server) {
        server.set('view engine', 'ejs');
        securePages = new _secureApp(server, '/secure');

        this.homePage = this.homePage.bind(this);
        this.productPage = this.productPage.bind(this);
        this.renderErrorPage = this.renderErrorPage.bind(this);
        this.renderHowToPlaceOrder = this.renderHowToPlaceOrder.bind(this);
        this.renderWhyShopHere = this.renderWhyShopHere.bind(this);
        this.renderRequestAProduct = this.renderRequestAProduct.bind(this);
        this.renderShippingTerms = this.renderShippingTerms.bind(this);
        this.renderPrivacyPolicy = this.renderPrivacyPolicy.bind(this);
        this.renderTermsAndConditions = this.renderTermsAndConditions.bind(this);
        this.renderAboutUs = this.renderAboutUs.bind(this);
        this.renderContactUs = this.renderContactUs.bind(this);
        this.renderCart = this.renderCart.bind(this);
        this.processCart = this.processCart.bind(this);

        this.loadRoutes(server);
    }

    loadRoutes(server) {
        server.get('/', this.homePage);
        server.get('/product', this.productPage);
        server.get('/error', this.renderErrorPage);
        server.get('/cart', this.renderCart);
        server.post('/cart', this.processCart);

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

    homePage(req, res) {
        let pageData = {};
        pageData[constants.cartItems] = utils.getCartItemsCount(req);
        res.render('../pages/index', utils.constructPageData(req.user, pageData));
    }

    productPage(req, res) {
        dal.getProductById(req.query.pid)
            .then((product) => {
                if (product === undefined) {
                    throw new Error("No Product found in database for product id:" + req.query.pid);
                }
                else {
                    let pageData = {};
                    pageData[constants.product] = product;
                    pageData[constants.cartItems] = utils.getCartItemsCount(req);
                    res.render('../pages/product', utils.constructPageData(req.user, pageData));
                }
            })
            .catch((err) => {
                utils.navigateToError(req, res, err, textService["Unknown Product"]);
            });
    }

    renderHowToPlaceOrder(req, res) {
        let pageData = {};
        pageData[constants.cartItems] = utils.getCartItemsCount(req);
        res.render('../pages/static/howtoplaceorder', utils.constructPageData(req.user, pageData));
    }

    renderWhyShopHere(req, res) {
        let pageData = {};
        pageData[constants.cartItems] = utils.getCartItemsCount(req);
        res.render('../pages/static/whyshophere', utils.constructPageData(req.user, pageData));
    }

    renderRequestAProduct(req, res) {
        let pageData = {};
        pageData[constants.cartItems] = utils.getCartItemsCount(req);
        res.render('../pages/static/requestaproduct', utils.constructPageData(req.user, pageData));
    }

    renderShippingTerms(req, res) {
        let pageData = {};
        pageData[constants.cartItems] = utils.getCartItemsCount(req);
        res.render('../pages/static/shippingterms', utils.constructPageData(req.user, pageData));
    }

    renderPrivacyPolicy(req, res) {
        let pageData = {};
        pageData[constants.cartItems] = utils.getCartItemsCount(req);
        res.render('../pages/static/privacypolicy', utils.constructPageData(req.user, pageData));
    }

    renderTermsAndConditions(req, res) {
        let pageData = {};
        pageData[constants.cartItems] = utils.getCartItemsCount(req);
        res.render('../pages/static/termsandconditions', utils.constructPageData(req.user, pageData));
    }

    renderAboutUs(req, res) {
        let pageData = {};
        pageData[constants.cartItems] = utils.getCartItemsCount(req);
        res.render('../pages/static/about', utils.constructPageData(req.user, pageData));
    }

    renderContactUs(req, res) {
        let pageData = {};
        pageData[constants.cartItems] = utils.getCartItemsCount(req);
        res.render('../pages/static/contact', utils.constructPageData(req.user, pageData));
    }

    renderCart(req, res) {
        try {
            let pageData = {};
            pageData[constants.cartItems] = utils.getCartItemsCount(req);
            pageData[constants.shoppingCartProducts] = [];

            if (req.session.products !== undefined) {
                let productIds = req.session.products.map(ele => ele.productId);
                let productInfo = dal.getProducts(productIds);
                productInfo.map(p => p.quantity = req.session.products.find(ele => ele.productId === p.id).quantity);
                pageData[constants.shoppingCartProducts] = productInfo;
            }

            res.render('../pages/cart', utils.constructPageData(req.user, pageData));
        }
        catch (err) {
            utils.navigateToError(req, res, err, undefined);
        }
    }

    processCart(req, res) {
        // TODO: First check if the same user is doing post
        // TODO:Check the state of the checkout state from session
        console.log(req.body);
        let pageData = {};
        pageData[constants.cartItems] = utils.getCartItemsCount(req);
        res.render('../pages/cart', utils.constructPageData(req.user, pageData));
    }

    renderErrorPage(req, res) {
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
        res.render('../pages/error', utils.constructPageData(req.user, pageData));
    }
}

module.exports = dynamicPages;