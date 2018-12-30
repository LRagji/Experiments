class pageHome {
    constructor(server, dataAccessService, utilityService, constantsService) {
        this.dal = dataAccessService;
        this.util = utilityService;
        this.const = constantsService;

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderhomePage = this.renderhomePage.bind(this);

        this.loadRoutes(server);
    }

    loadRoutes(server) {
        server.get('/', this.renderhomePage);
    }

    async renderhomePage(req, res) {
        try {
            let pageData = {};
            pageData[this.const.cartItems] = this.util.getCartItemsCount(req);
            res.render('../pages/index', await this.util.constructPageData(req.user, pageData, this.dal));
        }
        catch (err) {
            this.util.navigateToError(req, res, err);
        }
    }

}
module.exports = pageHome