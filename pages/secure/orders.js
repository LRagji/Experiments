class pageOrders {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService) {
        this.dal = dataAccessService;
        this.util = utilityService;
        this.const = constantsService;

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderOrders = this.renderOrders.bind(this);

        this.loadRoutes(server, basePath, auth);
    }

    loadRoutes(server, basePath, auth) {
        server.get(basePath + '/orders', auth.authenticatedInterceptor(basePath + '/login'), this.renderOrders);
    }

    async renderOrders(req, res) {
        try {
            let order = await this.dal.getOrderById(1);
            let productInfo = await this.dal.getProducts(order.products.map(p => p.productId))

            order.products.forEach((prductKVP) => {
                if (productInfo.find((p) => { p.id === prductKVP.productId }) === undefined) {
                    productInfo.push({
                        id: prductKVP.productId,
                        discontinued: true,
                        offerprice: prductKVP.offerprice
                    });
                }
            });

            productInfo.map(p => p.quantity = order.products.find(ele => ele.productId === p.id).quantity);
            order.products = productInfo;

            let pageData = {};
            pageData[this.const.orderdetails] = order;
            pageData[this.const.cartItems] = this.util.getCartItemsCount(req);
            res.render('../pages/secure/orders', this.util.constructPageData(req.user, pageData));
        }

        catch (err) {
            this.util.navigateToError(req, res, err);
        }
    }
}
module.exports = pageOrders;