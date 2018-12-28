class pageUserManangement {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService) {
        this.dal = dataAccessService;
        this.util = utilityService;
        this.const = constantsService;

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderUserManagement = this.renderUserManagement.bind(this);

        this.loadRoutes(server, basePath, auth);
    }

    loadRoutes(server, basePath, auth) {
        server.get(basePath + '/users', auth.authenticatedInterceptor(basePath + '/login'), this.util.onlyAdmin, this.renderUserManagement);
    }

    renderUserManagement(req, res) {
        try {
            let pageData = {};
            pageData[this.const.cartItems] = this.util.getCartItemsCount(req);
            res.render('../pages/secure/usermanagement', this.util.constructPageData(req.user, pageData));
        }
        catch (err) {
            this.util.navigateToError(req, res, err);
        }
    }
}
module.exports = pageUserManangement;