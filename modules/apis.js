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
                "name": "Doctor's Best, Best Vitamin C, 1000 mg, 120 Veggi " + ((page * size) + i),
                "offerprice": (page * size) + i,
                "price": (((page * size) + i) * 10),
                "image": "Product2.jpg",
                "shippingdetail": "Ships in 10 days."

            })
        }
        if (req.query.page < 1)
            res.status(206).send(arr);
        else
            res.status(200).send(arr);
    }

    addProductToSession(req, res) {
        try {
            utils.addProductOrQuantityToCartItem(req, req.body.productId, 1);

            res.status(201).send({ "TotalProducts": utils.getCartItemsCount(req) });
        }
        catch (err) {
            console.error(err);
            res.status(413).send({ "TotalProducts": utils.getCartItemsCount(req) });
        }
    }
}

module.exports = apiServer;