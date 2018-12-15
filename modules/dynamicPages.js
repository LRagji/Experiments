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
        this.renderHowToPlaceOrder= this.renderHowToPlaceOrder.bind(this);
        this.loadRoutes(server);
    }

    loadRoutes(server) {
        server.get('/', this.homePage);
        server.get('/product', this.productPage);
        server.get('/error', this.renderErrorPage);

        //Static
        server.get('/howtoorder',this.renderHowToPlaceOrder);
        return server;
    }

    homePage(req, res) {
        let pageData = {};
        pageData[constants.cartItems] =  utils.getCartItemsCount(req);
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
                    pageData[constants.cartItems] =  utils.getCartItemsCount(req);
                    res.render('../pages/product', utils.constructPageData(req.user, pageData));
                }
            })
            .catch((err) => {
                utils.navigateToError(req, res, err, textService["Unknown Product"]);
            });
    }

    renderHowToPlaceOrder(req,res)
    {
        let pageData = {};
        pageData[constants.cartItems] =  utils.getCartItemsCount(req);
        res.render('../pages/static/howtoplaceorder', utils.constructPageData(req.user, pageData));
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
        pageData[constants.cartItems] =  utils.getCartItemsCount(req);
        res.render('../pages/error', utils.constructPageData(req.user, pageData));
    }
}

module.exports = dynamicPages;