let securePage = require('../../modules/securePage')
class pageComment extends securePage {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService, textService) {
        super(auth, dataAccessService, utilityService, constantsService, textService);

        this.loadRoutes = this.loadRoutes.bind(this);
        this.render = this.render.bind(this);
        this.handleCreate = this.handleCreate.bind(this);

        this.loadRoutes(server, basePath);
    }

    loadRoutes(server, basePath) {
        server.post(basePath + '/comment', this.safeRender(this.render));
        server.post(basePath + '/comment/new', this.safeRender(this.handleCreate));
    }

    async render(req, renderView) {
        let product = await this.dal.products.readProductById(req.body.pid);
        product.brand = await this.dal.brands.readBrandById(product.brand);
        let pageData = {};
        pageData[this.const.product] = product;
        renderView('../pages/secure/comment', pageData);
    }

    async handleCreate(req, renderView, renderRedirect) {
        req.body.pid = parseInt(req.body.pid);
        req.body.rating = parseInt(req.body.rating);
        await this.dal.feedback.createFeedback(req.user.id, req.body.pid, req.body.rating, req.body.comment);
        renderRedirect("/product?pid=" + req.body.pid);
        return;
    }
}
module.exports = pageComment;