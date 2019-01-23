let page = require('../modules/page')
class pageHealthLinks extends page {
    constructor(server, dataAccessService, utilityService, constantsService, textService) {

        super(dataAccessService, utilityService, constantsService, textService);

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderHealthLinks = this.renderHealthLinks.bind(this);

        this.loadRoutes(server);
    }

    loadRoutes(server) {
        server.get('/healthLinks', this.safeRender(this.renderHealthLinks));
    }

    async renderHealthLinks(req, renderView) {
        if (this.util.validateLength(req.query.id, 50, 1) === false) {
            throw new Error("Invalid Input parameter name length.")
        }
        let pageData = {};
        pageData[this.const.footerLinksView] = await this.dal.healthLinks.getHealthLinkContentFor(req.query.id);
        renderView('../pages/healthlinks', pageData);
    }

}
module.exports = pageHealthLinks