class pageSuccess {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService) {
        this.dal = dataAccessService;
        this.util = utilityService;
        this.const = constantsService;

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderSuccess = this.renderSuccess.bind(this);

        this.loadRoutes(server, basePath, auth);
    }

    loadRoutes(server, basePath, auth) {
        server.get(basePath + '/success', auth.authenticatedInterceptor(basePath + '/login'), this.renderSuccess);
    }

    async renderSuccess(req, res) {
        try {
            if (req.query.oid !== undefined) {
                let orderId = parseInt(req.query.oid);
                let order = await this.dal.getOrderById(orderId);

                if (order === undefined) throw new Error("Cannot find the order mentioned.")
                if (order.userId !== req.user.id) res.redirect('/cart');

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

                let pageData = {};
                pageData[this.const.orderdetails] = order;
                pageData[this.const.cartItems] = this.util.getCartItemsCount(req);
                res.render('../pages/secure/success', await this.util.constructPageData(req.user, pageData, this.dal));
            }
            else {
                res.redirect('/cart');
            }
        }
        catch (err) {
            this.util.navigateToError(req, res, err, undefined);
        }
    }
}

module.exports = pageSuccess;