let page = require('../modules/page')
class pageHealthLibrary extends page {
    constructor(server, dataAccessService, utilityService, constantsService, textService) {

        super(dataAccessService, utilityService, constantsService, textService);

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderHealthLibrary = this.renderHealthLibrary.bind(this);

        this.loadRoutes(server);
    }

    loadRoutes(server) {
        server.get('/healthlibrary', this.safeRender(this.renderHealthLibrary));
    }

    async renderHealthLibrary(req, renderView) {
        let pageData = {};
        let category = {};
        let links = await this.dal.getAllHealthLinks();
        links.forEach(link => {
            let key = link.name.toUpperCase().substring(0, 1);
            if (category[key] === undefined) {
                category[key] = [];
            }
            category[key].push(link);
        });
        pageData[this.const.healthLibraryIndex] = category;
        renderView('../pages/healthlibrary', pageData);
    }

}
module.exports = pageHealthLibrary