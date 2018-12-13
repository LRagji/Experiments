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
        for (let i = 0; i < 10; i++) {
            arr.push({
                "productname": "Laukik",
                "price": i
            })
        }
        res.json(arr);
    }
}

module.exports=apiServer;