let page = require('../modules/page')
class pageSearch extends page {
    constructor(server, dataAccessService, utilityService, constantsService, textService) {
        super(dataAccessService, utilityService, constantsService, textService);

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderSearch = this.renderSearch.bind(this);
        this.renderSearchResults = this.renderSearchResults.bind(this);

        this.loadRoutes(server);
    }

    loadRoutes(server) {
        server.get('/search', this.safeRender(this.renderSearch));
        server.post('/search', this.safeRender(this.renderSearchResults));
    }

    async renderSearch(req, renderView) {
        let pageData = {};
        pageData[this.const.searchTittle] = "Showing All Products";
        pageData[this.const.searchFilter] = JSON.stringify({});
        renderView('../pages/search', pageData);
    }

    async renderSearchResults(req, renderView) {

        if (this.util.validateLength(req.body.keyword, 50, 1) === false) {
            throw new Error("Invalid search parameter name length.")
        }
        let pageData = {};
        pageData[this.const.searchTittle] = "Searching for \"" + req.body.keyword + "\"";
        pageData[this.const.searchFilter] = JSON.stringify({ "wwhi": "fff" });
        renderView('../pages/search', pageData);
    }

}
module.exports = pageSearch