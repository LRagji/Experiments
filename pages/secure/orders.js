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
            let topOrders = await this.dal.orders.getTopOrdersForUser(req.user.id, 10);
            for (let idx = 0; idx < topOrders.length; idx++) {
                let order = topOrders[idx];

                let productInfo = await this.dal.getProducts(order.products.map(p => p.productId))

                order.products.forEach((prductKVP) => {
                    let pi = productInfo.find((p) => p.id === prductKVP.productId);
                    if (pi === undefined) {
                        productInfo.push({
                            id: prductKVP.productId,
                            discontinued: true,
                            offerprice: prductKVP.offerprice,
                            quantity: prductKVP.quantity
                        });
                    }
                    else {
                        pi.offerprice = prductKVP.offerprice;
                        pi.quantity = prductKVP.quantity
                    }

                });

                order.products = productInfo;
            }
            let pageData = {};
            pageData[this.const.orders] = topOrders;
            pageData[this.const.cartItems] = this.util.getCartItemsCount(req);
            res.render('../pages/secure/orders', await this.util.constructPageData(req.user, pageData,this.dal));
        }

        catch (err) {
            this.util.navigateToError(req, res, err);
        }
    }
}
module.exports = pageOrders;