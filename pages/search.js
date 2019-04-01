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
        pageData[this.const.searchFilter] = JSON.stringify({ like: { keyword: "" } });
        renderView('../pages/search', pageData);
    }

    async renderSearchResults(req, renderView) {
        let filter = { like: {}, equal: {}, ascending: {}, descending: {}, greaterThan: {}, lessThan: {} };
        let searchText = "";
        if (req.body.keyword !== undefined) {
            if (this.util.validateLength(req.body.keyword, 50, 1) === false) {
                throw new Error("Invalid search parameter name length.")
            }
            filter.like.keyword = req.body.keyword;
            searchText += (searchText === "" ? "" : ", ") + "keywords like:" + filter.like.keyword;
        }

        if (req.body.brandID !== undefined) {
            let brand = await this.dal.brands.readBrandById(req.body.brandID);
            if (brand === undefined) {
                throw new Error("Invalid search parameter Brand Id.")
            }
            filter.equal.brand = brand.id;
            searchText += (searchText === "" ? "" : ", ") + "manufactured by:" + brand.name;
        }

        if (!isNaN(parseInt(req.body.subcat)) && !isNaN(parseInt(req.body.cat))) {
            req.body.subcat = parseInt(req.body.subcat);
            req.body.cat = parseInt(req.body.cat);
            let category = await this.dal.categories.readCategoryId(req.body.cat);
            let subcategory = await this.dal.subCategories.readSubCategoryId(req.body.subcat);
            if (subcategory === undefined) {
                throw new Error("Invalid search parameter Sub-category Id.")
            }
            if (category === undefined) {
                throw new Error("Invalid search parameter Category Id.")
            }

            filter.containsArr = { "subcategories": [subcategory.id], "categories": [category.id] };
            searchText += (searchText === "" ? "" : ", ") + "sub categorized as " + subcategory.name;
            
        } else if (!isNaN(parseInt(req.body.cat))) {
            req.body.cat = parseInt(req.body.cat);
            let category = await this.dal.categories.readCategoryId(req.body.cat);
            if (category === undefined) {
                throw new Error("Invalid search parameter Category Id.")
            }
            filter.containsArr = { "categories": [category.id] };
            searchText += (searchText === "" ? "" : ", ") + "categorized as " + category.name;
        }

        let optimizedFilter = this.util.cloneFilterForNetworkTransport(filter);
        if (optimizedFilter === undefined) {
            throw new Error("Invalid search request.")
        }

        let pageData = {};
        pageData[this.const.searchTittle] = "Showing products " + searchText;
        pageData[this.const.searchFilter] = JSON.stringify(optimizedFilter);
        renderView('../pages/search', pageData);
    }
}
module.exports = pageSearch