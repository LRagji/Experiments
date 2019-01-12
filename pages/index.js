let page = require('../modules/page')
class pageHome extends page {

    constructor(server, dataAccessService, utilityService, constantsService, textService) {
        super(dataAccessService, utilityService, constantsService, textService);

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderHomePage = this.renderHomePage.bind(this);

        this.loadRoutes(server);
    }

    loadRoutes(server) {
        server.get('/', this.safeRender(this.renderHomePage));
    }

    async renderHomePage(req, renderView) {

        let pageData = {};
        pageData[this.const.bestSellers] = await this.dal.products.readAllProducts(0, 20, { equal: { bestSeller: true } });
        pageData[this.const.newArrivals] = await this.dal.products.readAllProducts(0, 20, { equal: { newArrivals: true } });
        pageData[this.const.recentlyBought] = [];
        renderView('../pages/index', pageData);
    }
}

module.exports = pageHome;