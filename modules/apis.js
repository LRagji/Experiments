let page = require('../modules/page')
class apiServer extends page {
    constructor(server, dataAccessService, utilityService, constantsService, textService) {
        super(dataAccessService, utilityService, constantsService, textService);

        this.addProductToSession = this.addProductToSession.bind(this);
        this.searchProducts = this.searchProducts.bind(this);

        this.loadRoutes(server);
    }

    loadRoutes(server) {
        server.post('/v1/products/search', this.safeApi(this.searchProducts));
        server.post('/v1/cart/products', this.safeApi(this.addProductToSession));
    }

   async searchProducts(req, renderResponse) {
        
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

    async addProductToSession(req, renderResponse) {
        await this.util.addProductOrQuantityToCartItem(req, parseInt(req.body.productId), 1, this.dal);

        renderResponse(201, { "TotalProducts": this.util.getCartItemsCount(req) });
    }
}

module.exports = apiServer;