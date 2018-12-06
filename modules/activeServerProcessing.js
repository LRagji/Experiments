let serverProcessing = require('express')
let server = new serverProcessing();
let pgdal = require('../db/dataAccessLayer');
let dal = new pgdal();

class dynamicPages {

    constructor() {
        server.set('view engine', 'ejs');
        this.initialize = this.initialize.bind(this);
        this.homePage = this.homePage.bind(this);
        this.productPage = this.productPage.bind(this);
        this.renderErrorPage = this.renderErrorPage.bind(this);
        this.constructDataObject = this.constructDataObject.bind(this);
    }

    initialize() {
        server.get('/', this.homePage);
        server.get('/product', this.productPage);
        return server;
    }

    homePage(req, res) {
        req.user = { name: "Laukik" };
        res.render('../pages/index', this.constructDataObject(req.user));
    }

    productPage(req, res) {
        try {
            let productid = parseInt(req.query.pid);
            if (isNaN(productid)) throw new Error("Invalid Product Id:" + req.query.pid);
            dal.getProductById(parseInt(req.query.pid))
                .then((product) => {
                    if (product === undefined)
                        throw new Error("No Product found in database for product id:" + req.query.pid);
                    else
                        res.render('../pages/product', this.constructDataObject(req.user,product));
                })
                .catch((err) => {
                    this.renderErrorPage(res, err);
                });
        }
        catch (err) {
            this.renderErrorPage(res, err);
        }
    }

    renderErrorPage(res, err) {
        console.error(err);
        res.render('../pages/error', err);
    }

    constructDataObject(user, product) {
        return {
            user: user,
            product: product
        }
    }
}

module.exports = dynamicPages;