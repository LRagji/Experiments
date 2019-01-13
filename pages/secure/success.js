let securePage = require('../../modules/securePage')
class pageSuccess extends securePage {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService, textService) {
        super(auth, dataAccessService, utilityService, constantsService, textService);

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderSuccess = this.renderSuccess.bind(this);

        this.loadRoutes(server, basePath, auth);
    }

    loadRoutes(server, basePath, auth) {
        server.get(basePath + '/success', this.safeRender(this.renderSuccess));
    }

    async renderSuccess(req, renderView, renderRedirect) {
        if (req.query.oid !== undefined) {
            let orderId = parseInt(req.query.oid);
            let order = await this.dal.orders.getOrderById(orderId);

            if (order === undefined) throw new Error("Cannot find the order mentioned.")
            if (order.userId !== req.user.id) {
                renderRedirect('/cart');
                return;
            }

            let productIds = order.products.map(p => p.productId);
            let productInfo = await this.dal.products.readProducts(productIds)

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

            let cookieData = req.signedCookies[this.const.recentlyBoughtProducts];
            if (productIds.length > this.const.maxProductsToShowOnScreen) {
                cookieData = productIds.splice(0, this.const.maxProductsToShowOnScreen);
            }
            else if (cookieData !== undefined && Array.isArray(cookieData)) {
                if (cookieData.length > this.const.maxProductsToShowOnScreen) cookieData = cookieData.splice(0, this.const.maxProductsToShowOnScreen);
                let excessLength = (cookieData.length + productIds.length) - this.const.maxProductsToShowOnScreen;
                if (excessLength > 0) cookieData.splice(0, excessLength);
                while (cookieData.length < this.const.maxProductsToShowOnScreen && productIds.length > 0) cookieData.push(productIds.pop());
            }
            else {
                cookieData = productIds;
            }

            let pageData = {};
            pageData[this.const.orderdetails] = order;
            renderView('../pages/secure/success', pageData, { name: this.const.recentlyBoughtProducts, data: cookieData, maxAgeInMilliSeconds: (1000 * 60 * 24 * 30) });
        }
        else {
            renderRedirect('/cart');
        }
    }
}

module.exports = pageSuccess;