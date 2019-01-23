let adminPage = require('../../modules/adminPage')
class pageHealthTopics extends adminPage {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService, textService) {
        super(auth, dataAccessService, utilityService, constantsService, textService)

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderTopics = this.renderTopics.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCreate = this.handleCreate.bind(this);

        this.loadRoutes(server, basePath);
    }

    loadRoutes(server, basePath) {
        server.get(basePath + '/healthtopics', this.safeRender(this.renderTopics));
        server.post(basePath + '/healthtopics/edit', this.safeRender(this.handleEdit));
         server.post(basePath + '/healthtopics/new', this.safeRender(this.handleCreate));
    }

    async renderTopics(req, renderView) {
        let pageData = {};
        pageData[this.const.healthTopics] = await this.dal.healthTopics.readHealthTopics();
        pageData[this.const.healthTopicError] = req.flash(this.const.healthTopicError);

        renderView('../pages/secure/healthtopics', pageData);
    }

    async handleEdit(req, renderView, renderRedirect) {

        if (this.util.validateLength(req.body.name, 50, 1) === false) {
            req.flash(this.const.healthTopicError, "Invalid Input parameter name length.");
            renderRedirect("/secure/healthtopics");
            return;
        }

        if (this.util.validateIsWholeNumberBetween(req.body.id, 10000, 0) === false) {
            req.flash(this.const.healthTopicError, "Invalid Input parameter Id.");
            renderRedirect("/secure/healthtopics");
            return;
        }

        await this.dal.healthTopics.updateHealthTopic(req.body.id,req.body.name);
        renderRedirect("/secure/healthtopics");
        return;
    }

    async handleCreate(req, renderView, renderRedirect) {

        if (this.util.validateLength(req.body.name, 50, 1) === false) {
            req.flash(this.const.healthTopicError, "Invalid Input parameter name length.");
            renderRedirect("/secure/healthtopics");
            return;
        }

        await this.dal.healthTopics.createHealthTopic(req.body.name);
        renderRedirect("/secure/healthtopics");
        return;
    }
}
module.exports = pageHealthTopics;