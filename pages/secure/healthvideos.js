let adminPage = require('../../modules/adminPage')
class pageHealthVideos extends adminPage {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService, textService) {
        super(auth, dataAccessService, utilityService, constantsService, textService)

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderTopics = this.renderTopics.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCreate = this.handleCreate.bind(this);

        this.loadRoutes(server, basePath);
    }

    loadRoutes(server, basePath) {
        server.get(basePath + '/healthvideos', this.safeRender(this.renderVideos));
        server.post(basePath + '/healthvideos/edit', this.safeRender(this.handleEdit));
        server.post(basePath + '/healthvideos/new', this.safeRender(this.handleCreate));
    }

    async renderVideos(req, renderView) {
        let pageData = {};
        pageData[this.const.healthTopics] = this.util.sortArrayByProperty(await this.dal.healthTopics.readHealthTopics(), "name");
        pageData[this.const.healthTopicError] = req.flash(this.const.healthTopicError);

        renderView('../pages/secure/healthvideos', pageData);
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

        await this.dal.healthTopics.updateHealthTopic(req.body.id, req.body.name);
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
module.exports = pageHealthVideos;