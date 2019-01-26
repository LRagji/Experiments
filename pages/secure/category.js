let adminPage = require('../../modules/adminPage')
class pageCategory extends adminPage {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService, textService) {
        super(auth, dataAccessService, utilityService, constantsService, textService)

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderCategories = this.renderCategories.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCreate = this.handleCreate.bind(this);

        this.loadRoutes(server, basePath);
    }

    loadRoutes(server, basePath) {
        server.get(basePath + '/category', this.safeRender(this.renderCategories));
        server.post(basePath + '/category/edit', this.safeRender(this.handleEdit));
        server.post(basePath + '/category/new', this.safeRender(this.handleCreate));
    }

    async renderCategories(req, renderView) {
        let pageData = {};
        pageData[this.const.categories] = this.util.sortArrayByProperty(await this.dal.categories.readAllCategories(), "name");
        pageData[this.const.categoriesError] = req.flash(this.const.categoriesError);

        renderView('../pages/secure/category', pageData);
    }

    async handleEdit(req, renderView, renderRedirect) {

        if (this.util.validateLength(req.body.name, 50, 1) === false) {
            req.flash(this.const.categoriesError, "Invalid Input parameter name length.");
            renderRedirect("/secure/category");
            return;
        }

        if (this.util.validateIsWholeNumberBetween(req.body.id, 10000, 0) === false) {
            req.flash(this.const.categoriesError, "Invalid Input parameter Id.");
            renderRedirect("/secure/category");
            return;
        }

        await this.dal.categories.updateCategory(req.body.id, req.body.name);
        renderRedirect("/secure/category");
        return;
    }

    async handleCreate(req, renderView, renderRedirect) {

        if (this.util.validateLength(req.body.name, 50, 1) === false) {
            req.flash(this.const.categoriesError, "Invalid Input parameter name length.");
            renderRedirect("/secure/category");
            return;
        }

        await this.dal.categories.createCategory(req.body.name);
        renderRedirect("/secure/category");
        return;
    }
}
module.exports = pageCategory;