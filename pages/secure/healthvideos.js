let adminPage = require('../../modules/adminPage')
class pageHealthVideos extends adminPage {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService, textService) {
        super(auth, dataAccessService, utilityService, constantsService, textService)

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderVideos = this.renderVideos.bind(this);
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
        pageData[this.const.healthConditions] = this.util.sortArrayByProperty(await this.dal.healthVideos.readHealthConditions(), "name");
        pageData[this.const.ingredients] = this.util.sortArrayByProperty(await this.dal.healthVideos.readIngredients(), "name");
        pageData[this.const.healthVideos] = this.util.sortArrayByProperty(await this.dal.healthVideos.readHealthVideos(), "name");
        pageData[this.const.healthVideosError] = req.flash(this.const.healthVideosError);

        renderView('../pages/secure/healthvideos', pageData);
    }

    async handleEdit(req, renderView, renderRedirect) {

        if (Array.isArray(req.body.healthConditions) === false) {
            req.flash(this.const.healthVideosError, "Invalid Input parameter health conditions type.");
            renderRedirect("/secure/healthvideos");
            return;
        }

        req.body.healthConditions = req.body.healthConditions.filter((value, index, self) => self.indexOf(value) === index && value !== "-1");
        req.body.healthConditions = req.body.healthConditions.map(e => parseInt(e));

        if (Array.isArray(req.body.ingredients) === false) {
            req.flash(this.const.healthVideosError, "Invalid Input parameter ingredients type.");
            renderRedirect("/secure/healthvideos");
            return;
        }

        req.body.ingredients = req.body.ingredients.filter((value, index, self) => self.indexOf(value) === index && value !== "-1");
        req.body.ingredients = req.body.ingredients.map(e => parseInt(e));

        if (this.util.validateLength(req.body.name, 50, 1) === false) {
            req.flash(this.const.healthVideosError, "Invalid Input parameter name length.");
            renderRedirect("/secure/healthvideos");
            return;
        }

        if (this.util.validateLength(req.body.tag, 500, 1) === false) {
            req.flash(this.const.healthVideosError, "Invalid Input parameter video script length.");
            renderRedirect("/secure/healthvideos");
            return;
        }

        if (this.util.validateLength(req.body.text, 2000, 1) === false) {
            req.flash(this.const.healthVideosError, "Invalid Input parameter video text length.");
            renderRedirect("/secure/healthvideos");
            return;
        }

        if (this.util.validateIsWholeNumberBetween(req.body.id, 10000, 0) === false) {
            req.flash(this.const.healthVideosError, "Invalid Input parameter Id.");
            renderRedirect("/secure/healthvideos");
            return;
        }

        await this.dal.healthVideos.updateHealthVideo(req.body.id, req.body.name, req.body.text, req.body.tag, req.body.ingredients, req.body.healthConditions);
        renderRedirect("/secure/healthvideos");
        return;
    }

    async handleCreate(req, renderView, renderRedirect) {

        if (this.util.validateLength(req.body.name, 50, 1) === false) {
            req.flash(this.const.healthVideosError, "Invalid Input parameter name length.");
            renderRedirect("/secure/healthvideos");
            return;
        }

        await this.dal.healthVideos.createHealthVideo(req.body.name, "", "", [], []);
        renderRedirect("/secure/healthvideos");
        return;
    }
}
module.exports = pageHealthVideos;