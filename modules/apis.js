let utils = require('./utilities');
let pgdal = require('../db/dataAccessLayer');
let dal = new pgdal();
class apiServer {
    constructor(server) {
        this.getHomePageProducts = this.getHomePageProducts.bind(this);
        this.addProductToSession = this.addProductToSession.bind(this);
        this.loadRoutes(server);
    }

    loadRoutes(server) {
        server.get('/v1/home/products', this.getHomePageProducts);
        server.post('/v1/cart/products', this.addProductToSession);
        return server;
    }

    getHomePageProducts(req, res) {
        let page = parseInt(req.query.page);
        let size = parseInt(req.query.size);

        dal.getAllProducts(page, size).then((arr) => {
            if (arr.length === 0)
                res.status(200).send(arr);
            else
                res.status(206).send(arr);
        });
    }

    addProductToSession(req, res) {
        try {
            utils.addProductOrQuantityToCartItem(req, parseInt(req.body.productId), 1);

            res.status(201).send({ "TotalProducts": utils.getCartItemsCount(req) });
        }
        catch (err) {
            console.error(err);
            res.status(413).send({ "TotalProducts": utils.getCartItemsCount(req) });
        }
    }
}

module.exports = apiServer;