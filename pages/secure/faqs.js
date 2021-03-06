let adminPage = require('../../modules/adminPage')
class pageFAQS extends adminPage {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService, textService) {
        super(auth, dataAccessService, utilityService, constantsService, textService)

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderFAQS = this.renderFAQS.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCreate = this.handleCreate.bind(this);

        this.loadRoutes(server, basePath);
    }

    loadRoutes(server, basePath) {
        server.get(basePath + '/faqs', this.safeRender(this.renderFAQS));
        server.post(basePath + '/faqs/edit', this.safeRender(this.handleEdit));
        server.post(basePath + '/faqs/delete', this.safeRender(this.handleDelete));
        server.post(basePath + '/faqs/new', this.safeRender(this.handleCreate));
    }

    async renderFAQS(req, renderView) {
        let pageData = {};
        pageData[this.const.FAQS] = await this.dal.faqs.getAllFAQ();
        pageData[this.const.FAQSError] = req.flash(this.const.FAQSError);
        renderView('../pages/secure/faqs', pageData);
    }

    async handleDelete(req, renderView, renderRedirect) {
        if (this.util.validateIsWholeNumberBetween(req.body.id, 5000, 1) === false) {
            req.flash(this.const.FAQSError, "Invalid Input parameter Id.");
            renderRedirect("/secure/faqs");
            return;
        }

        await this.dal.faqs.deleteFAQ(parseInt(req.body.id));
        renderRedirect("/secure/faqs");
        return;
    }

    async handleEdit(req, renderView, renderRedirect) {
        if (this.util.validateIsWholeNumberBetween(req.body.id, 5000, 1) === false) {
            req.flash(this.const.FAQSError, "Invalid Input parameter Id.");
            renderRedirect("/secure/faqs");
            return;
        }

        if (this.util.validateLength(req.body.Q, 200, 1) === false) {
            req.flash(this.const.FAQSError, "Invalid Input parameter Question length.");
            renderRedirect("/secure/faqs");
            return;
        }

        if (this.util.validateLength(req.body.A, 1500, 1) === false) {
            req.flash(this.const.FAQSError, "Answers length should be between 1, to 1000 characters.");
            renderRedirect("/secure/faqs");
            return;
        }

        await this.dal.faqs.updateFAQ(parseInt(req.body.id), req.body.Q, req.body.A);
        renderRedirect("/secure/faqs");
        return;

    }

    async handleCreate(req, renderView, renderRedirect) {

        if (this.util.validateLength(req.body.Q, 200, 1) === false) {
            req.flash(this.const.FAQSError, "Invalid Input parameter Question length.");
            renderRedirect("/secure/faqs");
            return;
        }

        await this.dal.faqs.createFAQ(req.body.Q, "Answer");
        renderRedirect("/secure/faqs");
        return;
    }
}
module.exports = pageFAQS;