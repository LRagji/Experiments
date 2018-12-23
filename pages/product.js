
class pageProduct {

    constructor(server, dataAccessService, utilityService, constantsService, textService) {
        this.dal = dataAccessService;
        this.util = utilityService;
        this.const = constantsService;
        this.textService = textService;

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderProductPage = this.renderProductPage.bind(this);

        this.loadRoutes(server);
    }

    loadRoutes(server) {
        server.get('/product', this.renderProductPage);
    }

    async renderProductPage(req, res) {
        try {
            let product = await this.dal.getProductById(req.query.pid)

            if (product === undefined) {
                throw new Error("No Product found in database for product id:" + req.query.pid);
            }
            else {
                let pageData = {};
                pageData[this.const.product] = product;
                pageData[this.const.cartItems] = this.util.getCartItemsCount(req);
                res.render('../pages/product', this.util.constructPageData(req.user, pageData));
            }
        }
        catch (err) {
            this.util.navigateToError(req, res, err, this.textService["Unknown Product"]);
        }
    }
}

module.exports = pageProduct;