let page = require('../modules/page')
class apiServer extends page {
    constructor(server, dataAccessService, utilityService, constantsService, textService) {
        super(dataAccessService, utilityService, constantsService, textService);

        this.getHomePageProducts = this.getHomePageProducts.bind(this);
        this.addProductToSession = this.addProductToSession.bind(this);

        this.loadRoutes(server);
    }

    loadRoutes(server) {
        server.get('/v1/home/products', this.safeApi(this.getHomePageProducts));
        server.post('/v1/cart/products', this.safeApi(this.addProductToSession));
    }

    async getHomePageProducts(req, renderResponse) {
        let page = parseInt(req.query.page);
        let size = parseInt(req.query.size);
        let keyword = req.query.s !== undefined ? req.query.s.trim() : "";
        let category = req.query.c !== undefined ? req.query.c.trim() : "";
        let subcategory = req.query.sc !== undefined ? req.query.sc.trim() : "";

        let products = await this.dal.products.readAllProducts(page, size, keyword, category, subcategory);
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