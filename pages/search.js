class pageSearch {
    constructor(server, dataAccessService, utilityService, constantsService) {
        this.dal = dataAccessService;
        this.util = utilityService;
        this.const = constantsService;

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderSearch = this.renderSearch.bind(this);
        this.renderSearchResults = this.renderSearchResults.bind(this);

        this.loadRoutes(server);
    }

    loadRoutes(server) {
        server.get('/search', this.renderSearch);
        server.post('/search', this.renderSearchResults);
    }

    async renderSearch(req, res) {
        try {
            let pageData = {};
            pageData[this.const.searchKeyword] = "";
            pageData[this.const.cartItems] = this.util.getCartItemsCount(req);
            res.render('../pages/search', await this.util.constructPageData(req.user, pageData, this.dal));
        }
        catch (err) {
            this.util.navigateToError(req, res, err);
        }
    }

    async renderSearchResults(req, res) {
        try {
            if (this.util.validateLength(req.body.keyword, 50, 1) === false) {
                throw new Error("Invalid search parameter name length.")
            }
            let pageData = {};
            pageData[this.const.searchKeyword] = req.body.keyword;
            pageData[this.const.cartItems] = this.util.getCartItemsCount(req);
            res.render('../pages/search', await this.util.constructPageData(req.user, pageData, this.dal));
        }
        catch (err) {
            this.util.navigateToError(req, res, err);
        }
    }

}
module.exports = pageSearch