let page = require('../modules/page')
class pageHealthVideos extends page {
    constructor(server, dataAccessService, utilityService, constantsService, textService) {
        super(dataAccessService, utilityService, constantsService, textService);

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderVideos = this.renderVideos.bind(this);

        this.loadRoutes(server);
    }

    loadRoutes(server) {
        server.get('/healthvideos', this.safeRender(this.renderVideos));
    }

    async renderVideos(req, renderView) {
        let pageData = {};
        // pageData[this.const.searchTittle] = "Showing All Products";
        // pageData[this.const.searchFilter] = JSON.stringify({ like: { keyword: "" } });
        renderView('../pages/healthvideos', pageData);
    }
}
module.exports = pageHealthVideos