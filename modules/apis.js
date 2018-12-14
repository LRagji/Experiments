class apiServer {
    constructor(server) {
        this.getHomePageProducts = this.getHomePageProducts.bind(this);
        this.loadRoutes(server);
    }

    loadRoutes(server) {
        server.get('/v1/home/products', this.getHomePageProducts);
        return server;
    }

    getHomePageProducts(req, res) {
        let arr = [];
        let page = parseInt(req.query.page);
        let size = parseInt(req.query.size);
        for (let i = 0; i < size; i++) {
            arr.push({
                "id": (page * size) + i,
                "productname": "Laukik " + i,
                "price": (page * size) + i
            })
        }
        if (req.query.page < 3)
            res.status(206).send(arr);
        else
            res.status(200).send(arr);
    }
}

module.exports = apiServer;