let adminPage = require('../../modules/adminPage')
class pageBrands extends adminPage {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService, textService) {
        super(auth, dataAccessService, utilityService, constantsService, textService)

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderBrands = this.renderBrands.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCreate = this.handleCreate.bind(this);

        this.loadRoutes(server, basePath);
    }

    loadRoutes(server, basePath) {
        server.get(basePath + '/brands', this.safeRender(this.renderBrands));
        server.post(basePath + '/brands/edit', this.safeRender(this.handleEdit));
        server.post(basePath + '/brands/new', this.safeRender(this.handleCreate));
    }

    async renderBrands(req, renderView) {
        let pageData = {};
        pageData[this.const.brands] = await this.dal.brands.readBrands();
        pageData[this.const.brandError] = req.flash(this.const.brandError);

        renderView('../pages/secure/brands', pageData);
    }

    async handleEdit(req, renderView, renderRedirect) {

        if (this.util.validateLength(req.body.name, 50, 1) === false) {
            req.flash(this.const.healthTopicError, "Invalid Input parameter name length.");
            renderRedirect("/secure/brands");
            return;
        }

        if (this.util.validateIsUrl(req.body.website) === false) {
            req.flash(this.const.brandError, "Invalid parameter website.");
            renderRedirect("/secure/brands");
            return;
        }

        if (this.util.validateIsWholeNumberBetween(req.body.id, 10000, 0) === false) {
            req.flash(this.const.healthTopicError, "Invalid Input parameter Id.");
            renderRedirect("/secure/brands");
            return;
        }

        await this.dal.brands.updateBrand(req.body.id, req.body.name, req.body.website);
        renderRedirect("/secure/brands");
        return;
    }

    async handleCreate(req, renderView, renderRedirect) {

        if (this.util.validateLength(req.body.name, 50, 1) === false) {
            req.flash(this.const.brandError, "Invalid Input parameter name length.");
            renderRedirect("/secure/brands");
            return;
        }

        if (this.util.validateIsUrl(req.body.website) === false) {
            req.flash(this.const.brandError, "Invalid parameter website.");
            renderRedirect("/secure/brands");
            return;
        }

        await this.dal.brands.createBrand(req.body.name, req.body.website);
        renderRedirect("/secure/brands");
        return;
    }
}
module.exports = pageBrands;