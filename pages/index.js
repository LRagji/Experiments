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

        let menuData = {};
        let subCategories = await this.dal.subCategories.readAllSubCategories();
        let menuCategories = await this.dal.categories.readAllMenuCategories();
        menuCategories.forEach((category) => {
            menuData[category.name] = subCategories.filter((subCat) => subCat.catid === category.id);
        })
        pageData.menuData = menuData;

        pageData[this.const.bestSellers] = await this.dal.products.readAllProducts(0, this.const.maxProductsToShowOnScreen, { equal: { bestSeller: true } });
        pageData[this.const.newArrivals] = await this.dal.products.readAllProducts(0, this.const.maxProductsToShowOnScreen, { equal: { newArrivals: true } });
        pageData[this.const.recentlyBought] = recentlyPurchasedProducts;

        renderView('../pages/index', pageData);
    }
}

module.exports = pageHome;