let adminPage = require('../../modules/adminPage')
class pageLinks extends adminPage {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService, textService) {
        super(auth, dataAccessService, utilityService, constantsService, textService)

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderLinks = this.renderLinks.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCreate = this.handleCreate.bind(this);

        this.loadRoutes(server, basePath);
    }

    loadRoutes(server, basePath) {
        server.get(basePath + '/healthlinks', this.safeRender(this.renderLinks));
        server.post(basePath + '/healthlinks/edit', this.safeRender(this.handleEdit));
        server.post(basePath + '/healthlinks/delete', this.safeRender(this.handleDelete));
        server.post(basePath + '/healthlinks/new', this.safeRender(this.handleCreate));
    }

    async renderLinks(req, renderView) {
        let pageData = {};
        pageData[this.const.footerPageLinks] = await this.dal.getAllHealthLinks();
        pageData[this.const.footerLinksErr] = req.flash(this.const.footerLinksErr);

        renderView('../pages/secure/healthlinks', pageData);
    }

    async handleDelete(req, renderView, renderRedirect) {

        if (this.util.validateLength(req.body.name, 50, 1) === false) {
            req.flash(this.const.footerLinksErr, "Invalid Input parameter name length.");
            renderRedirect("/secure/healthlinks");
            return;
        }

        await this.dal.deleteHealthLink(req.body.name);
        renderRedirect("/secure/healthlinks");
        return;
    }

    async handleEdit(req, renderView, renderRedirect) {

        if (this.util.validateLength(req.body.name, 50, 1) === false) {
            req.flash(this.const.footerLinksErr, "Invalid Input parameter name length.");
            renderRedirect("/secure/healthlinks");
            return;
        }

        if (this.util.validateLength(req.body.contents, 105788, 1) === false) {
            req.flash(this.const.footerLinksErr, "Invalid Input parameter content length.");
            renderRedirect("/secure/healthlinks");
            return;
        }

        await this.dal.updateHealthLink(req.body.name, req.body.contents);
        renderRedirect("/secure/healthlinks");
        return;
    }

    async handleCreate(req, renderView, renderRedirect) {

        if (this.util.validateLength(req.body.name, 50, 1) === false) {
            req.flash(this.const.footerLinksErr, "Invalid Input parameter name length.");
            renderRedirect("/secure/healthlinks");
            return;
        }

        await this.dal.insertHealthLink(req.body.name, "Comming Soon");
        renderRedirect("/secure/healthlinks");
        return;
    }
}
module.exports = pageLinks;