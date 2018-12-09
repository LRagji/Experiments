let _secureApp = require('./secureApp');
let pgdal = require('../db/dataAccessLayer');
let dal = new pgdal();
let securePages = null;

class dynamicPages {

    constructor(server) {
        server.set('view engine', 'ejs');
        securePages = new _secureApp(server,'/secure');
        
        this.homePage = this.homePage.bind(this);
        this.productPage = this.productPage.bind(this);
        this.renderErrorPage = this.renderErrorPage.bind(this);
        this.constructDataObject = this.constructDataObject.bind(this);
        this.loadRoutes(server);
    }

    loadRoutes(server) {
        server.get('/', this.homePage);
        server.get('/product', this.productPage);
        server.get('/error', (req, res) => res.render('../pages/error', {}));
        return server;
    }

    homePage(req, res) {
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
                        res.render('../pages/product', this.constructDataObject(req.user, product));
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