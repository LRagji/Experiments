let adminPage = require('../../modules/adminPage')
class pageUserManangement extends adminPage {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService, textService) {
        super(auth, dataAccessService, utilityService, constantsService, textService)

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderUserManagement = this.renderUserManagement.bind(this);
        this.processUserActivation = this.processUserActivation.bind(this);
        this.processUserPromotion = this.processUserPromotion.bind(this);
        this.defaultUserSecret = this.defaultUserSecret.bind(this);
        this.validateIsSelfUser = this.validateIsSelfUser.bind(this);

        this.loadRoutes(server, basePath);
    }

    loadRoutes(server, basePath) {
        server.get(basePath + '/users', this.safeRender(this.renderUserManagement));
        server.post(basePath + '/users/activation', this.safeRender(this.processUserActivation, this.validateIsSelfUser));
        server.post(basePath + '/users/promotion', this.safeRender(this.processUserPromotion, this.validateIsSelfUser));
        server.post(basePath + '/users/secret', this.safeRender(this.defaultUserSecret, this.validateIsSelfUser));
    }

    async renderUserManagement(req, renderView) {
        let pageData = {};
        pageData[this.const.userManagementError] = req.flash(this.const.userManagementError);
        renderView('../pages/secure/usermanagement', pageData);
    }

    async processUserActivation(req, renderView, renderRedirect) {
        let userId = parseInt(req.body.userid);
        let status = "";
        if (req.body.status === "Deactivate")
            status = "inactive";
        else if (req.body.status === "Activate")
            status = "active";
        else {
            req.flash(this.const.userManagementError, "Invalid property status" + req.body.status);
            renderRedirect("/secure/users");
            return;
        }

        await this.dal.users.updateUserActivationState(userId, status);
        renderRedirect("/secure/users");
        return;
    }

    async processUserPromotion(req, renderView, renderRedirect) {
        let userId = parseInt(req.body.userid);

        if (req.body.promotion !== "normal" && req.body.promotion !== "admin") {
            req.flash(this.const.userManagementError, "Invalid property promotion" + req.body.promotion);
            renderRedirect("/secure/users");
            return;
        }

        await this.dal.users.updateUserAccountType(userId, req.body.promotion);
        renderRedirect("/secure/users");
        return;
    }

    async defaultUserSecret(req, renderView, renderRedirect) {
        let userId = parseInt(req.body.userid);

        if (parseInt(req.body.password) !== userId) {
            req.flash(this.const.userManagementError, "Invalid request");
            renderRedirect("/secure/users");
            return;
        }

        await this.dal.users.resetUserAccountPassword(userId);
        renderRedirect("/secure/users");
        return;
    }

    validateIsSelfUser(req, res, next) {
        try {
            let userId = parseInt(req.body.userid);
            if (userId < 0) {
                req.flash(this.const.userManagementError, "Invalid User id(" + userId + ").");
                res.redirect("/secure/users");
            }
            if (req.user.id === userId) {
                req.flash(this.const.userManagementError, "Cannot edit current logged in user.");
                res.redirect("/secure/users");
                return;
            }
            next();
        }
        catch (err) {
            this.util.navigateToError(req, res, err);
        }
    }
}
module.exports = pageUserManangement;