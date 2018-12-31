class pageFAQS {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService) {
        this.dal = dataAccessService;
        this.util = utilityService;
        this.const = constantsService;

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderFAQS = this.renderFAQS.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCreate = this.handleCreate.bind(this);

        this.loadRoutes(server, basePath, auth);
    }

    loadRoutes(server, basePath, auth) {
        server.get(basePath + '/faqs', auth.authenticatedInterceptor(basePath + '/login'), this.util.onlyAdmin, this.renderFAQS);
        server.post(basePath + '/faqs/edit', auth.authenticatedInterceptor(basePath + '/login'), this.util.onlyAdmin, this.handleEdit);
        server.post(basePath + '/faqs/delete', auth.authenticatedInterceptor(basePath + '/login'), this.util.onlyAdmin, this.handleDelete);
        server.post(basePath + '/faqs/new', auth.authenticatedInterceptor(basePath + '/login'), this.util.onlyAdmin, this.handleCreate);
    }

    async renderFAQS(req, res) {
        try {
            let pageData = {};
            pageData[this.const.FAQS] = await this.dal.getAllFAQ();
            pageData[this.const.FAQSError] = req.flash(this.const.FAQSError);
            pageData[this.const.cartItems] = this.util.getCartItemsCount(req);
            res.render('../pages/secure/faqs', await this.util.constructPageData(req.user, pageData, this.dal));
        }
        catch (err) {
            this.util.navigateToError(req, res, err);
        }
    }

    async handleDelete(req, res) {
        try {
            if (this.util.validateIsWholeNumberBetween(req.body.id, 5000, 1) === false) {
                req.flash(this.const.FAQSError, "Invalid Input parameter Id.");
                res.redirect("/secure/faqs");
                return;
            }

            await this.dal.deleteFAQ(parseInt(req.body.id));
            res.redirect("/secure/faqs");
            return;
        }
        catch (err) {
            this.util.navigateToError(req, res, err);
        }
    }

    async handleEdit(req, res) {
        try {
            if (this.util.validateIsWholeNumberBetween(req.body.id, 5000, 1) === false) {
                req.flash(this.const.FAQSError, "Invalid Input parameter Id.");
                res.redirect("/secure/faqs");
                return;
            }

            if (this.util.validateLength(req.body.Q, 200, 1) === false) {
                req.flash(this.const.FAQSError, "Invalid Input parameter Question length.");
                res.redirect("/secure/faqs");
                return;
            }

            if (this.util.validateLength(req.body.A, 200, 1) === false) {
                req.flash(this.const.FAQSError, "Invalid Input parameter Answer length.");
                res.redirect("/secure/faqs");
                return;
            }

            await this.dal.updateFAQ(parseInt(req.body.id), req.body.Q, req.body.A);
            res.redirect("/secure/faqs");
            return;
        }
        catch (err) {
            this.util.navigateToError(req, res, err);
        }
    }

    async handleCreate(req, res) {
        try {

            if (this.util.validateLength(req.body.Q, 200, 1) === false) {
                req.flash(this.const.FAQSError, "Invalid Input parameter Question length.");
                res.redirect("/secure/faqs");
                return;
            }

            await this.dal.createFAQ(req.body.Q, "Answer");
            res.redirect("/secure/faqs");
            return;
        }
        catch (err) {
            this.util.navigateToError(req, res, err);
        }
    }
}
module.exports = pageFAQS;