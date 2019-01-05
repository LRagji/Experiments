let adminPage = require('../../modules/adminPage')
class pageAppSettings extends adminPage {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService, textService) {
        super(auth, dataAccessService, utilityService, constantsService, textService)

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderAppSettings = this.renderAppSettings.bind(this);

        this.loadRoutes(server, basePath);
    }

    loadRoutes(server, basePath) {
        server.get(basePath + '/settings', this.safeRender(this.renderAppSettings));
    }

    async renderAppSettings(req, renderView) {
        let pageData = {};
        pageData[this.const.taxSettingsKey] = await this.dal.appSettings.readSetting(this.const.taxSettingsKey);
        renderView('../pages/secure/appsettings', pageData);
    }
}
module.exports = pageAppSettings;