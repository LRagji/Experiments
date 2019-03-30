let page = require('../modules/page')
class pageHome extends page {

    constructor(server, dataAccessService, utilityService, constantsService, textService) {
        super(dataAccessService, utilityService, constantsService, textService);

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderHomePage = this.renderHomePage.bind(this);

        this.loadRoutes(server);
    }

    loadRoutes(server) {
        server.get('/', this.safeRender(this.renderHomePage));
    }

    async renderHomePage(req, renderView) {

        let pageData = {};
        let recentlyPurchasedProducts = [];
        let cookieData = req.signedCookies[this.const.recentlyBoughtProducts];
        if (cookieData !== undefined && Array.isArray(cookieData)) {
            if (cookieData.length > this.const.maxProductsToShowOnScreen) cookieData = cookieData.splice(0, this.const.maxProductsToShowOnScreen)
            recentlyPurchasedProducts = await this.dal.products.readProducts(cookieData);
        }
        pageData[this.const.bestSellers] = await this.dal.products.readAllProducts(0, this.const.maxProductsToShowOnScreen, { equal: { bestSeller: true } });
        pageData[this.const.newArrivals] = await this.dal.products.readAllProducts(0, this.const.maxProductsToShowOnScreen, { equal: { newArrivals: true } });
        pageData[this.const.recentlyBought] = recentlyPurchasedProducts;
        pageData.menuData = {
            "Animal": [{ "name": "Dog", "link": "https://www.npmjs.com/package/ejs" }, { "name": "Cat", "link": "https://www.npmjs.com/package/ejs" }, { "name": "Mouse", "link": "https://www.npmjs.com/package/ejs" }],
            "Number": [{ "name": "1", "link": "https://www.npmjs.com/package/ejs" }, { "name": "2", "link": "https://www.npmjs.com/package/ejs" }, { "name": "3", "link": "https://www.npmjs.com/package/ejs" }],
            "Character": [{ "name": "A", "link": "https://www.npmjs.com/package/ejs" }, { "name": "B", "link": "https://www.npmjs.com/package/ejs" }, { "name": "C", "link": "https://www.npmjs.com/package/ejs" }]
        };
        renderView('../pages/index', pageData);
    }
}

module.exports = pageHome;