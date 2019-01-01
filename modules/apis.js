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

    async getHomePageProducts(req, res) {
        try {
            let page = parseInt(req.query.page);
            let size = parseInt(req.query.size);
            let keyword = req.query.s!==undefined?req.query.s.trim():"";
            let category = req.query.c!==undefined?req.query.c.trim():"";
            let subcategory = req.query.sc!==undefined?req.query.sc.trim():"";

            let products = await dal.getAllProducts(page, size, keyword, category, subcategory);
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