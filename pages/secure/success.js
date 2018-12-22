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
                productInfo.map(p => p.quantity = order.products.find(ele => ele.productId === p.id).quantity);
                if (productInfo.length !== order.products.length) throw new Error("One or more products are discontinued from your order.");
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