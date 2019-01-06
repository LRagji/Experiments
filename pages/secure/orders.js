let securePage = require('../../modules/securePage')
class pageOrders extends securePage {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService, textService) {
        super(auth, dataAccessService, utilityService, constantsService, textService);

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderOrders = this.renderOrders.bind(this);

        this.loadRoutes(server, basePath);
    }

    loadRoutes(server, basePath) {
        server.get(basePath + '/orders', this.safeRender(this.renderOrders));
    }

    async renderOrders(req, renderView) {
        let topOrders = await this.dal.orders.getTopOrdersForUser(req.user.id, 10);
        for (let idx = 0; idx < topOrders.length; idx++) {
            let order = topOrders[idx];

            let productInfo = await this.dal.products.readProducts(order.products.map(p => p.productId))

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
        renderView('../pages/secure/orders', pageData);
    }
}
module.exports = pageOrders;