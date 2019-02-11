let page = require('../modules/page')
class apiServer extends page {
    constructor(server, dataAccessService, utilityService, constantsService, textService) {
        super(dataAccessService, utilityService, constantsService, textService);

        this.addProductToSession = this.addProductToSession.bind(this);
        this.searchProducts = this.searchProducts.bind(this);
        this.searchSummary = this.searchSummary.bind(this);
        this.addProductToWishlist = this.addProductToWishlist.bind(this);
        this.searchVideos = this.searchVideos.bind(this);

        this.loadRoutes(server);
    }

    loadRoutes(server) {
        server.post('/v1/products/search', this.safeApi(this.searchProducts));
        server.post('/v1/products/search/summary', this.safeApi(this.searchSummary));
        server.post('/v1/cart/products', this.safeApi(this.addProductToSession));
        server.post('/v1/wishlist/products', this.safeApi(this.addProductToWishlist));
        server.post('/v1/videos/search', this.safeApi(this.searchVideos));
    }

    async searchProducts(req, renderResponse) {
        // EG: filter = {
        //     like: {"columnname":value},
        //     equal: {},
        //     ascending: {"price":0},
        //     descending: {},
        //     greaterThan: {},
        //     lessThan: {},
        //     containsArr:{
        //                      columnname:[]
        //                 }
        // };
        let page = parseInt(req.query.page);
        let size = parseInt(req.query.size);
        let filter = this.util.cloneFilterForNetworkTransport(req.body);
        if (filter === undefined) {
            throw new Error("Invalid filter parameter.")
        }

        let products = await this.dal.products.readAllProducts(page, size, filter);
        if (products.length === size)
            renderResponse(206, products);
        else
            renderResponse(200, products);
    }

    async searchVideos(req, renderResponse) {
        // EG: filter = {
        //     like: {"columnname":value},
        //     equal: {},
        //     ascending: {"price":0},
        //     descending: {},
        //     greaterThan: {},
        //     lessThan: {},
        //     containsArr:{
        //                      columnname:[]
        //                 }
        // };
        let page = parseInt(req.query.page);
        let size = parseInt(req.query.size);
        // let filter = this.util.cloneFilterForNetworkTransport(req.body);
        // if (filter === undefined) {
        //     throw new Error("Invalid filter parameter.")
        // }

        let videos = await this.dal.healthVideos.readPaginatedHealthVideos(page, size, req.body);
        if (videos.moreResults === true)
            renderResponse(206, videos.results);
        else
            renderResponse(200, videos.results);
    }

    async searchSummary(req, renderResponse) {
        // EG: filter = {
        //     like: {"columnname":value},
        //     equal: {},
        //     ascending: {"price":0},
        //     descending: {},
        //     greaterThan: {},
        //     lessThan: {}
        // };
        let filter = this.util.cloneFilterForNetworkTransport(req.body);
        if (filter === undefined) {
            throw new Error("Invalid filter parameter.")
        }

        let summary = await this.dal.products.summarizeResults(filter);
        renderResponse(200, summary);
    }

    async addProductToSession(req, renderResponse) {
        await this.util.addProductOrQuantityToCartItem(req, parseInt(req.body.productId), 1, this.dal);

        renderResponse(201, { "TotalProducts": this.util.getCartItemsCount(req) });
    }

    async addProductToWishlist(req, renderResponse) {
        if (req.user === undefined) {
            renderResponse(401, { "redirect": this.loginPageUrl });
            return;
        }

        await this.dal.wishlist.createWishlist(parseInt(req.body.productId), parseInt(req.user.id));

        renderResponse(201, {});
    }
}

module.exports = apiServer;