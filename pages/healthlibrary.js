let page = require('../modules/page')
class pageHealthLibrary extends page {
    constructor(server, dataAccessService, utilityService, constantsService, textService) {

        super(dataAccessService, utilityService, constantsService, textService);

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderHealthLibrary = this.renderHealthLibrary.bind(this);

        this.loadRoutes(server);
    }

    loadRoutes(server) {
        server.get('/healthlibrary', this.renderHealthLibrary);
    }

    async renderHealthLibrary(req, res) {
        try {
            let pageData = {};
            pageData[this.const.healthLibraryIndex] = await this.dal.getHealthLinksIndex();
            pageData[this.const.cartItems] = this.util.getCartItemsCount(req);
            res.render('../pages/healthlibrary', await this.util.constructPageData(req.user, pageData, this.dal));
        }
        catch (err) {
            this.util.navigateToError(req, res, err);
        }
    }

}
module.exports = pageHealthLibrary