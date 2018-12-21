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

    renderSuccess(req, res) {
        try {
            if (req.query.oid !== undefined) {
                let orderId = parseInt(req.query.oid);
                let order = dal.getOrderById(orderId);

                if (order===undefined) throw new Error("Cannot find the order mentioned.")
                if (order.userId !== req.user.id) res.redirect('/cart');

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