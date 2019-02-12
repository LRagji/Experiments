let securePage = require('../../modules/securePage')
class pagePassword extends securePage {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService, textService) {
        super(auth, dataAccessService, utilityService, constantsService, textService);

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderPassword = this.renderPassword.bind(this);
        this.changePassword = this.changePassword.bind(this);

        this.loadRoutes(server, basePath);
    }

    loadRoutes(server, basePath) {
        server.get(basePath + '/password', this.safeRender(this.renderPassword));
        server.post(basePath + '/password', this.safeRender(this.changePassword));
    }

    async renderPassword(req, renderView) {
        let pageData = {};
        pageData[this.const.changePassError] = req.flash(this.const.changePassError);
        renderView('../pages/secure/password', pageData);
    }

    async changePassword(req, renderView, renderRedirect) {
        if (this.util.validateLength(req.body.existingPassword, 50, 1) === false) {
            req.flash(this.const.changePassError, "Invalid existing password length [50,1]");
            renderRedirect("./password");
            return;
        }

        if (this.util.validateLength(req.body.newPassword, 50, 1) === false) {
            req.flash(this.const.changePassError, "Invalid new password length [50,1]");
            renderRedirect("./password");
            return;
        }

        if (this.util.getHash(req.body.existingPassword) !== req.user.password) {
            req.flash(this.const.changePassError, "Invalid/Incorrect existing password.");
            renderRedirect("./password");
            return;
        }

        await this.dal.users.updateUserPassword(req.user.id, req.body.newPassword);

        renderRedirect("./logout");
    }

}

module.exports = pagePassword;