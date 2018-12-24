class pageProducts {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService) {
        this.dal = dataAccessService;
        this.util = utilityService;
        this.const = constantsService;

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderProducts = this.renderProducts.bind(this);


        this.loadRoutes(server, basePath, auth);
    }

    loadRoutes(server, basePath, auth) {
        server.get(basePath + '/products', auth.authenticatedInterceptor(basePath + '/login'), this.renderProducts);
    }

    renderProducts(req, res) {
        try {

            if (this.util.isAdmin(req.user) === false) {
                console.warn("Security Alert: User(" + req.user.id + ") tried to access non privilaged (products) page.");
                res.redirect("/secure/profile");
                return;
            }

            let pageData = {};
            pageData[this.const.cartItems] = this.util.getCartItemsCount(req);
            res.render('../pages/secure/products', this.util.constructPageData(req.user, pageData));

        }
        catch (err) {
            this.util.navigateToError(req, res, err);
        }

    }

}

module.exports = pageProducts;