let utils = require('./utilities');
let pgdal = require('../db/dataAccessLayer');
let dal = new pgdal();
class apiServer {
    constructor(server) {
        this.getHomePageProducts = this.getHomePageProducts.bind(this);
        this.addProductToSession = this.addProductToSession.bind(this);
        this.searchProducts = this.searchProducts.bind(this);

        this.loadRoutes(server);
    }

    loadRoutes(server) {
        server.get('/v1/home/products', this.getHomePageProducts);
        server.get('/v1/search', this.searchProducts);
        server.post('/v1/cart/products', this.addProductToSession);

        return server;
    }

    async getHomePageProducts(req, res) {
        try {
            let page = parseInt(req.query.page);
            let size = parseInt(req.query.size);

            let products = await dal.getAllProducts(page, size);
            if (products.length === size)
                res.status(206).send(products);
            else
                res.status(200).send(products);
        }
        catch (err) {
            console.error(err);
            res.status(500).send([]);
        }
    }

    async searchProducts(req, res) {
        try {
            let page = parseInt(req.query.page);
            let size = parseInt(req.query.size);
            let keyword = req.query.s.trim();

            let products = await dal.searchProducts(keyword, page, size);
            if (products.length === size)
                res.status(206).send(products);
            else
                res.status(200).send(products);
        }
        catch (err) {
            console.error(err);
            res.status(500).send([]);
        }
    }

    async addProductToSession(req, res) {
        try {
            await utils.addProductOrQuantityToCartItem(req, parseInt(req.body.productId), 1, dal);

            res.status(201).send({ "TotalProducts": utils.getCartItemsCount(req) });
        }
        catch (err) {
            console.error(err);
            res.status(413).send({ "TotalProducts": utils.getCartItemsCount(req) });
        }
    }
}

module.exports = apiServer;