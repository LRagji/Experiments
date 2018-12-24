class pageProducts {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService) {
        this.dal = dataAccessService;
        this.util = utilityService;
        this.const = constantsService;

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderProducts = this.renderProducts.bind(this);
        this.saveProduct = this.saveProduct.bind(this);


        this.loadRoutes(server, basePath, auth);
    }

    loadRoutes(server, basePath, auth) {
        server.get(basePath + '/products', auth.authenticatedInterceptor(basePath + '/login'), this.renderProducts);
        server.post(basePath + '/products', auth.authenticatedInterceptor(basePath + '/login'), this.saveProduct);
    }

    async renderProducts(req, res) {
        try {

            if (this.util.isAdmin(req.user) === false) {
                console.warn("Security Alert: User(" + req.user.id + ") tried to access non privilaged (products) page.");
                res.redirect("/secure/profile");
                return;
            }

            let existingProduct = undefined;
            if (req.query.pid != undefined) {
                existingProduct = await this.dal.getProductById(req.query.pid);
                if (existingProduct === undefined) {
                    req.flash(this.const.newProductError, "No product exisits with Product ID:" + req.query.pid);
                }
            }

            let pageData = {};
            pageData[this.const.productinfo] = existingProduct;
            pageData[this.const.newProductError] = req.flash(this.const.newProductError);
            pageData[this.const.newProductSuccess] = req.flash(this.const.newProductSuccess);
            pageData[this.const.cartItems] = this.util.getCartItemsCount(req);
            res.render('../pages/secure/products', this.util.constructPageData(req.user, pageData));

        }
        catch (err) {
            this.util.navigateToError(req, res, err);
        }

    }

    async saveProduct(req, res) {
        try {

            if (this.util.isAdmin(req.user) === false) {
                console.warn("Security Alert: User(" + req.user.id + ") tried to access non privilaged (products) page.");
                res.redirect("/secure/profile");
                return;
            }

            if (this.util.validateLength(req.body.name, 50, 1) === false) {
                req.flash(this.const.newProductError, "Invalid product name length [50,1].");
                res.redirect("/secure/products?tab=new");
                return;
            }

            await this.dal.saveProduct(req.body.name,
                );

        }
        catch (err) {
            this.util.navigateToError(req, res, err);
        }
    }

}

module.exports = pageProducts;