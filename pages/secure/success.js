let constants = require('../../modules/constants');
let utils = require('../../modules/utilities');
let pgdal = require('../../db/dataAccessLayer');
let dal = new pgdal();

class pageSuccess {
    constructor(server, basePath, auth) {
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
                let order = await dal.getOrderById(orderId);

                if (order === undefined) throw new Error("Cannot find the order mentioned.")
                if (order.userId !== req.user.id) res.redirect('/cart');

                let productInfo = await dal.getProducts(order.products.map(p => p.productId))

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
                pageData[constants.orderdetails] = order;
                pageData[constants.cartItems] = utils.getCartItemsCount(req);
                res.render('../pages/secure/success', utils.constructPageData(req.user, pageData));
            }
            else {
                res.redirect('/cart');
            }
        }
        catch (err) {
            utils.navigateToError(req, res, err, undefined);
        }
    }
}

module.exports = pageSuccess;