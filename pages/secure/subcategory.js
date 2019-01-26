let adminPage = require('../../modules/adminPage')
class pageSubCategory extends adminPage {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService, textService) {
        super(auth, dataAccessService, utilityService, constantsService, textService)

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderSubCategories = this.renderSubCategories.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCreate = this.handleCreate.bind(this);

        this.loadRoutes(server, basePath);
    }

    loadRoutes(server, basePath) {
        server.get(basePath + '/subcategory', this.safeRender(this.renderSubCategories));
        server.post(basePath + '/subcategory/edit', this.safeRender(this.handleEdit));
        server.post(basePath + '/subcategory/new', this.safeRender(this.handleCreate));
    }

    async renderSubCategories(req, renderView) {
        let pageData = {};
        pageData[this.const.subcategories] = this.util.sortArrayByProperty(await this.dal.subCategories.readAllSubCategories(), "name");
        pageData[this.const.subcategoriesError] = req.flash(this.const.subcategoriesError);

        renderView('../pages/secure/subcategory', pageData);
    }

    async handleEdit(req, renderView, renderRedirect) {

        if (this.util.validateLength(req.body.name, 50, 1) === false) {
            req.flash(this.const.subcategoriesError, "Invalid Input parameter name length.");
            renderRedirect("/secure/subcategory");
            return;
        }

        if (this.util.validateIsWholeNumberBetween(req.body.id, 10000, 0) === false) {
            req.flash(this.const.subcategoriesError, "Invalid Input parameter Id.");
            renderRedirect("/secure/subcategory");
            return;
        }

        await this.dal.categories.updateCategory(req.body.id, req.body.name);
        renderRedirect("/secure/subcategory");
        return;
    }

    async handleCreate(req, renderView, renderRedirect) {

        if (this.util.validateLength(req.body.name, 50, 1) === false) {
            req.flash(this.const.subcategoriesError, "Invalid Input parameter name length.");
            renderRedirect("/secure/subcategory");
            return;
        }

        await this.dal.categories.createCategory(req.body.name);
        renderRedirect("/secure/subcategory");
        return;
    }
}
module.exports = pageSubCategory;