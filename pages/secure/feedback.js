let adminPage = require('../../modules/adminPage')
class pageFeedback extends adminPage {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService, textService) {
        super(auth, dataAccessService, utilityService, constantsService, textService)

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderFeedback = this.renderFeedback.bind(this);
        // this.handleEdit = this.handleEdit.bind(this);
        // this.handleDelete = this.handleDelete.bind(this);
        // this.handleCreate = this.handleCreate.bind(this);

        this.loadRoutes(server, basePath);
    }

    loadRoutes(server, basePath) {
        server.get(basePath + '/feedback', this.safeRender(this.renderFeedback));
        // server.post(basePath + '/faqs/edit', this.safeRender(this.handleEdit));
        // server.post(basePath + '/faqs/delete', this.safeRender(this.handleDelete));
        // server.post(basePath + '/faqs/new', this.safeRender(this.handleCreate));
    }

    async renderFeedback(req, renderView) {
        let pendingComments = await this.dal.feedback.getAllPendingComments();

        //Update Products
        let productReviewCountMap = new Map();
        pendingComments.every((f) => productReviewCountMap.set(f.productid, (productReviewCountMap.has(f.productid) ? productReviewCountMap.get(f.productid) + 1 : 1)));
        let products = await this.dal.products.readProducts([...productReviewCountMap.keys()]);
        pendingComments = pendingComments.map((comment) => {
            let productId = comment.productid;
            comment.productid = products.find((p) => p.id === productId);
            if (comment.productid === undefined) comment.productid = productId;
            return comment;
        })

        //Update Users
        let distinctUserIds = new Set();
        pendingComments.every((f) => distinctUserIds.add(f.userid));
        distinctUserIds = [...distinctUserIds];
        let users = await this.dal.users.getUsersByIds(distinctUserIds);
        pendingComments = pendingComments.map((comment) => {
            let cUser = users.find((u) => u.id === comment.userid);
            if (cUser !== undefined) {
                comment.userid = cUser.salutation + " " + cUser.first + " " + cUser.last;
            }
            return comment;
        })

        let pageData = {};
        pageData[this.const.feedbackData] = pendingComments;
        // pageData[this.const.FAQSError] = req.flash(this.const.FAQSError);
        renderView('../pages/secure/feedback', pageData);
    }

    // async handleDelete(req, renderView, renderRedirect) {
    //     if (this.util.validateIsWholeNumberBetween(req.body.id, 5000, 1) === false) {
    //         req.flash(this.const.FAQSError, "Invalid Input parameter Id.");
    //         renderRedirect("/secure/faqs");
    //         return;
    //     }

    //     await this.dal.faqs.deleteFAQ(parseInt(req.body.id));
    //     renderRedirect("/secure/faqs");
    //     return;
    // }

    // async handleEdit(req, renderView, renderRedirect) {
    //     if (this.util.validateIsWholeNumberBetween(req.body.id, 5000, 1) === false) {
    //         req.flash(this.const.FAQSError, "Invalid Input parameter Id.");
    //         renderRedirect("/secure/faqs");
    //         return;
    //     }

    //     if (this.util.validateLength(req.body.Q, 200, 1) === false) {
    //         req.flash(this.const.FAQSError, "Invalid Input parameter Question length.");
    //         renderRedirect("/secure/faqs");
    //         return;
    //     }

    //     if (this.util.validateLength(req.body.A, 1500, 1) === false) {
    //         req.flash(this.const.FAQSError, "Answers length should be between 1, to 1000 characters.");
    //         renderRedirect("/secure/faqs");
    //         return;
    //     }

    //     await this.dal.faqs.updateFAQ(parseInt(req.body.id), req.body.Q, req.body.A);
    //     renderRedirect("/secure/faqs");
    //     return;

    // }

    // async handleCreate(req, renderView, renderRedirect) {

    //     if (this.util.validateLength(req.body.Q, 200, 1) === false) {
    //         req.flash(this.const.FAQSError, "Invalid Input parameter Question length.");
    //         renderRedirect("/secure/faqs");
    //         return;
    //     }

    //     await this.dal.faqs.createFAQ(req.body.Q, "Answer");
    //     renderRedirect("/secure/faqs");
    //     return;
    // }
}
module.exports = pageFeedback;