let page = require('../modules/page')
class pageProduct extends page {

    constructor(server, dataAccessService, utilityService, constantsService, textService) {
        super(dataAccessService, utilityService, constantsService, textService);

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderProductPage = this.renderProductPage.bind(this);

        this.loadRoutes(server);
    }

    loadRoutes(server) {
        server.get('/product', this.safeRender(this.renderProductPage));
    }

    async renderProductPage(req, renderView) {
        let product = await this.dal.products.readProductById(req.query.pid)

        if (product === undefined) {
            throw new Error("No Product found in database for product id:" + req.query.pid);
        }
        else {

            let faqObject = [];
            for (let i = 0; i < product.faq.length; i++) {
                faqObject.push(await this.dal.getFAQ(product.faq[i]));
            }
            product.faq = faqObject;

            let pageData = {};
            pageData[this.const.product] = product;
            renderView('../pages/product', pageData);
        }
    }
}

module.exports = pageProduct;