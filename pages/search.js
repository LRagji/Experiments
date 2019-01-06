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
        pageData[this.const.searchKeyword] = "";
        renderView('../pages/search', pageData);
    }

    async renderSearchResults(req, renderView) {

        if (this.util.validateLength(req.body.keyword, 50, 1) === false) {
            throw new Error("Invalid search parameter name length.")
        }
        let pageData = {};
        pageData[this.const.searchKeyword] = req.body.keyword;
        pageData[this.const.cartItems] = this.util.getCartItemsCount(req);
        renderView('../pages/search', pageData);
    }

}
module.exports = pageSearch