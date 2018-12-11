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
        this.constructDataObject = this.constructDataObject.bind(this);
        this.loadRoutes(server);
    }

    loadRoutes(server) {
        server.get('/', this.homePage);
        server.get('/product', this.productPage);
        server.get('/error', this.renderErrorPage);
        return server;
    }

    homePage(req, res) {
        res.render('../pages/index', this.constructDataObject(req.user));
    }

    productPage(req, res) {
        try {
            // TODO:Move this code to dal
            let productid = parseInt(req.query.pid);
            if (isNaN(productid)) throw new Error("Invalid Product Id:" + req.query.pid);
            
            dal.getProductById(productid)
                .then((product) => {
                    if (product === undefined)
                        throw new Error("No Product found in database for product id:" + req.query.pid);
                    else
                        res.render('../pages/product', this.constructDataObject(req.user, product));
                })
                .catch((err) => {
                    utils.navigateToError(req, res, err,textService["Unknown Product"]);
                });
        }
        catch (err) {
            utils.navigateToError(req, res, err);
        }
    }

    renderErrorPage(req, res) {
        let exception = req.flash(constants.error);
        if (exception.length <= 0) {
            //This is the case when user directly request for a error page
            exception.push(new Error("Unknown Error"));
        }
        else{
            exception.forEach(err => {
                console.error('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                console.error(err);    
                console.error('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
            });
            
        }
        
        res.render('../pages/error', this.constructDataObject(req.user, undefined));
    }

    constructDataObject(user, product) {
        return {
            user: user,
            product: product
        }
    }
}

module.exports = dynamicPages;