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
                faqObject.push(await this.dal.faqs.getFAQ(product.faq[i]));
            }
            product.faq = faqObject;

            product.meta.relatedProducts = await this.dal.products.readProducts(product.meta.relatedProducts);

            product.brand = await this.dal.brands.readBrandById(product.brand);

            let feedback = await this.dal.feedback.getApprovedCommnetsFor(product.id)
            //"{"id":4,"userid":0,"rating":5,"productid":3,"timestamp":"1555142219584","comment":"Comment number: 3","status":0}"
            product.feedback = feedback;

            let pageData = {};
            pageData[this.const.product] = product;
            renderView('../pages/product', pageData);
        }
    }
}

module.exports = pageProduct;