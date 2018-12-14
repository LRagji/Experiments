let utils = require('./utilities');

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
        // TODO:Call the appropiate API
        let arr = [];
        let page = parseInt(req.query.page);
        let size = parseInt(req.query.size);
        for (let i = 0; i < size; i++) {
            arr.push({
                "id": (page * size) + i,
                "productname": "Product " + (page * size) + i,
                "price": (page * size) + i
            })
        }
        if (req.query.page < 3)
            res.status(206).send(arr);
        else
            res.status(200).send(arr);
    }

    addProductToSession(req, res) {

        if (req.session.products === undefined) {
            req.session.products = [];
        }

        req.session.products.push({ "productId": req.body.productId });
        res.status(201).send({ "TotalProducts": utils.getCartItemsCount(req) });
    }
}

module.exports = apiServer;