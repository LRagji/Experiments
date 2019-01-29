let adminPage = require('../../modules/adminPage')
class pageAppSettings extends adminPage {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService, textService) {
        super(auth, dataAccessService, utilityService, constantsService, textService)

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderAppSettings = this.renderAppSettings.bind(this);
        this.handleEdit = this.handleEdit.bind(this);

        this.loadRoutes(server, basePath);
    }

    loadRoutes(server, basePath) {
        server.get(basePath + '/settings', this.safeRender(this.renderAppSettings));
        server.post(basePath + '/settings/edit', this.safeRender(this.handleEdit));
    }

    async renderAppSettings(req, renderView) {
        let pageData = {};
        pageData[this.const.taxSettingsKey] = await this.dal.appSettings.readSetting(this.const.taxSettingsKey);
        renderView('../pages/secure/appsettings', pageData);
    }

    async handleEdit(req, renderView, renderRedirect) {

        if (this.util.validateIsWholeNumberBetween(req.body.tax, 100, 1) === false) {
            req.flash(this.const.healthTopicError, "Invalid Input parameter tax.");
            renderRedirect("/secure/settings");
            return;
        }

        await this.dal.appSettings.updateSetting(this.const.taxSettingsKey, parseInt(req.body.tax));
        renderRedirect("/secure/settings");
        return;
    }
}
module.exports = pageAppSettings;