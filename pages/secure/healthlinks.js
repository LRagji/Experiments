class pageLinks {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService) {
        this.dal = dataAccessService;
        this.util = utilityService;
        this.const = constantsService;

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderLinks = this.renderLinks.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCreate = this.handleCreate.bind(this);

        this.loadRoutes(server, basePath, auth);
    }

    loadRoutes(server, basePath, auth) {
        server.get(basePath + '/healthlinks', auth.authenticatedInterceptor(basePath + '/login'), this.util.onlyAdmin, this.renderLinks);
        server.post(basePath + '/healthlinks/edit', auth.authenticatedInterceptor(basePath + '/login'), this.util.onlyAdmin, this.handleEdit);
        server.post(basePath + '/healthlinks/delete', auth.authenticatedInterceptor(basePath + '/login'), this.util.onlyAdmin, this.handleDelete);
        server.post(basePath + '/healthlinks/new', auth.authenticatedInterceptor(basePath + '/login'), this.util.onlyAdmin, this.handleCreate);
    }

    async renderLinks(req, res) {
        try {
            let pageData = {};
            pageData[this.const.footerPageLinks] = await this.dal.getAllHealthLinks();
            pageData[this.const.footerLinksErr] = req.flash(this.const.footerLinksErr);
            pageData[this.const.cartItems] = this.util.getCartItemsCount(req);
            res.render('../pages/secure/healthlinks', await this.util.constructPageData(req.user, pageData, this.dal));
        }
        catch (err) {
            this.util.navigateToError(req, res, err);
        }
    }

    async handleDelete(req, res) {
        try {
            if (this.util.validateLength(req.body.name, 50, 1) === false) {
                req.flash(this.const.footerLinksErr, "Invalid Input parameter name length.");
                res.redirect("/secure/healthlinks");
                return;
            }

            await this.dal.deleteHealthLink(req.body.name);
            res.redirect("/secure/healthlinks");
            return;
        }
        catch (err) {
            this.util.navigateToError(req, res, err);
        }
    }

    async handleEdit(req, res) {
        try {
            if (this.util.validateLength(req.body.name, 50, 1) === false) {
                req.flash(this.const.footerLinksErr, "Invalid Input parameter name length.");
                res.redirect("/secure/healthlinks");
                return;
            }

            if (this.util.validateLength(req.body.contents, 105788, 1) === false) {
                req.flash(this.const.footerLinksErr, "Invalid Input parameter content length.");
                res.redirect("/secure/healthlinks");
                return;
            }

            await this.dal.updateHealthLink(req.body.name, req.body.contents);
            res.redirect("/secure/healthlinks");
            return;
        }
        catch (err) {
            this.util.navigateToError(req, res, err);
        }
    }

    async handleCreate(req, res) {
        try {
            if (this.util.validateLength(req.body.name, 50, 1) === false) {
                req.flash(this.const.footerLinksErr, "Invalid Input parameter name length.");
                res.redirect("/secure/healthlinks");
                return;
            }

            await this.dal.insertHealthLink(req.body.name, "Comming Soon");
            res.redirect("/secure/healthlinks");
            return;
        }
        catch (err) {
            this.util.navigateToError(req, res, err);
        }
    }
}
module.exports = pageLinks;