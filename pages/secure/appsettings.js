class pageAppSettings {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService) {
        this.dal = dataAccessService;
        this.util = utilityService;
        this.const = constantsService;

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderAppSettings = this.renderAppSettings.bind(this);

        this.loadRoutes(server, basePath, auth);
    }

    loadRoutes(server, basePath, auth) {
        server.get(basePath + '/settings', auth.authenticatedInterceptor(basePath + '/login'), this.util.onlyAdmin, this.renderAppSettings);
    }

    async renderAppSettings(req, res) {
        try {
            let pageData = {};
            pageData[this.const.cartItems] = this.util.getCartItemsCount(req);
            res.render('../pages/secure/appsettings', await this.util.constructPageData(req.user, pageData, this.dal));
        }
        catch (err) {
            this.util.navigateToError(req, res, err);
        }
    }
}
module.exports = pageAppSettings;