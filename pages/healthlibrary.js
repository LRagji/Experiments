let page = require('../modules/page')
class pageHealthLibrary extends page {
    constructor(server, dataAccessService, utilityService, constantsService, textService) {

        super(dataAccessService, utilityService, constantsService, textService);

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderHealthLibrary = this.renderHealthLibrary.bind(this);

        this.loadRoutes(server);
    }

    loadRoutes(server) {
        server.get('/healthlibrary', this.safeRender(this.renderHealthLibrary,'../pages/healthlibrary'));
    }

    async renderHealthLibrary(req, res) {
        let pageData = {};
        pageData[this.const.healthLibraryIndex] = await this.dal.getHealthLinksIndex();
        return pageData;
    }

}
module.exports = pageHealthLibrary