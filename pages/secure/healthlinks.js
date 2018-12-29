class pageLinks {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService) {
        this.dal = dataAccessService;
        this.util = utilityService;
        this.const = constantsService;

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderLinks = this.renderLinks.bind(this);

        this.loadRoutes(server, basePath, auth);
    }

    loadRoutes(server, basePath, auth) {
        server.get(basePath + '/healthlinks', auth.authenticatedInterceptor(basePath + '/login'), this.util.onlyAdmin, this.renderLinks);
    }

    async renderLinks(req, res) {
        try {
            let pageData = {};
            pageData[this.const.cartItems] = this.util.getCartItemsCount(req);
            res.render('../pages/secure/healthlinks', this.util.constructPageData(req.user, pageData));
        }
        catch (err) {
            this.util.navigateToError(req, res, err);
        }
    }
}
module.exports=pageLinks;