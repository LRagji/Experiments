let securePage = require('../../modules/securePage')
class pageSuccess extends securePage {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService, textService) {
        super(auth, dataAccessService, utilityService, constantsService, textService);

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderSuccess = this.renderSuccess.bind(this);

        this.loadRoutes(server, basePath, auth);
    }

    loadRoutes(server, basePath, auth) {
        server.get(basePath + '/success', this.safeResponse(this.renderSuccess));
    }

    async renderSuccess(req, res) {
        if (req.query.oid !== undefined) {
            let orderId = parseInt(req.query.oid);
            let order = await this.dal.orders.getOrderById(orderId);

            if (order === undefined) throw new Error("Cannot find the order mentioned.")
            if (order.userId !== req.user.id) {
                res.redirect('/cart');
                return;
            }

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

            let pageData = {};
            pageData[this.const.orderdetails] = order;
            pageData[this.const.cartItems] = this.util.getCartItemsCount(req);
            res.render('../pages/secure/success', await this.util.constructPageData(req.user, pageData, this.dal));
        }
        else {
            res.redirect('/cart');
        }
    }
}

module.exports = pageSuccess;