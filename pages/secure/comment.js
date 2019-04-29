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

        if (req.body.commentid !== undefined && !isNaN(req.body.commentid)) {
            let replyComment = await this.dal.feedback.readCommentById(parseInt(req.body.commentid, 10));
            replyComment = replyComment[0];
            let user = await this.dal.users.getUsersByIds([replyComment.userid]);
            user = user[0];
            replyComment.userid = user.salutation + " " + user.first + " " + user.last;
            pageData[this.const.replyComment] = replyComment;
        }

        renderView('../pages/secure/comment', pageData);
    }

    async handleCreate(req, renderView, renderRedirect) {
        req.body.pid = parseInt(req.body.pid);
        req.body.rating = parseInt(req.body.rating);
        req.body.rating = isNaN(req.body.rating) ? -1 : req.body.rating;
        if (isNaN(req.body.cid)) {
            await this.dal.feedback.createFeedback(req.user.id, req.body.pid, req.body.rating, req.body.comment);
        }
        else {
            await this.dal.feedback.createFeedback(req.user.id, req.body.pid, req.body.rating, req.body.comment, parseInt(req.body.cid, 10));
        }
        renderRedirect("/product?pid=" + req.body.pid);
        return;
    }
}
module.exports = pageComment;