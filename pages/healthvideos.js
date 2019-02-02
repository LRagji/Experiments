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
        pageData[this.const.healthConditions] = this.util.sortArrayByProperty(await this.dal.healthVideos.readHealthConditions(), "name");
        pageData[this.const.ingredients] = this.util.sortArrayByProperty(await this.dal.healthVideos.readIngredients(), "name");
        pageData[this.const.healthVideos] = this.util.sortArrayByProperty(await this.dal.healthVideos.readHealthVideos(), "name");
        renderView('../pages/healthvideos', pageData);
    }
}
module.exports = pageHealthVideos