let page = require('../modules/page')
class pageHealthVideo extends page {
    constructor(server, dataAccessService, utilityService, constantsService, textService) {

        super(dataAccessService, utilityService, constantsService, textService);

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderHealthLinks = this.renderHealthLinks.bind(this);

        this.loadRoutes(server);
    }

    loadRoutes(server) {
        server.get('/healthvideo', this.safeRender(this.renderHealthLinks));
    }

    async renderHealthLinks(req, renderView) {
        if (this.util.validateLength(req.query.id, 10000, 1) === false) {
            throw new Error("Invalid video parameter id.")
        }
        let pageData = {};
        pageData[this.const.healthVideoDetail] = await this.dal.healthVideos.readHealthVideoById(req.query.id);
        renderView('../pages/healthvideo', pageData);
    }

}
module.exports = pageHealthVideo