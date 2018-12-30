class pageHealthLinks {
    constructor(server, dataAccessService, utilityService, constantsService) {
        this.dal = dataAccessService;
        this.util = utilityService;
        this.const = constantsService;

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderHealthLinks = this.renderHealthLinks.bind(this);

        this.loadRoutes(server);
    }

    loadRoutes(server) {
        server.get('/healthLinks', this.renderHealthLinks);
    }

    async renderHealthLinks(req, res) {
        try {
            if (this.util.validateLength(req.query.id, 50, 1) === false) {
                throw new Error("Invalid Input parameter name length.")
            }
            let pageData = {};
            pageData[this.const.footerLinksView] = await this.dal.getHealthLinkContentFor(req.query.id);
            pageData[this.const.cartItems] = this.util.getCartItemsCount(req);
            res.render('../pages//healthlinks', await this.util.constructPageData(req.user, pageData, this.dal));
        }
        catch (err) {
            this.util.navigateToError(req, res, err);
        }
    }

}
module.exports = pageHealthLinks