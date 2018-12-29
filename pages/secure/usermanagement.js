class pageUserManangement {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService) {
        this.dal = dataAccessService;
        this.util = utilityService;
        this.const = constantsService;

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderUserManagement = this.renderUserManagement.bind(this);
        this.processUserActivation = this.processUserActivation.bind(this);
        this.processUserPromotion = this.processUserPromotion.bind(this);
        this.defaultUserSecret = this.defaultUserSecret.bind(this);
        this.validateIsSelfUser = this.validateIsSelfUser.bind(this);

        this.loadRoutes(server, basePath, auth);
    }

    loadRoutes(server, basePath, auth) {
        server.get(basePath + '/users', auth.authenticatedInterceptor(basePath + '/login'), this.util.onlyAdmin, this.renderUserManagement);
        server.post(basePath + '/users/activation', auth.authenticatedInterceptor(basePath + '/login'), this.util.onlyAdmin, this.validateIsSelfUser, this.processUserActivation);
        server.post(basePath + '/users/promotion', auth.authenticatedInterceptor(basePath + '/login'), this.util.onlyAdmin, this.validateIsSelfUser, this.processUserPromotion);
        server.post(basePath + '/users/secret', auth.authenticatedInterceptor(basePath + '/login'), this.util.onlyAdmin, this.validateIsSelfUser, this.defaultUserSecret);
    }

    async renderUserManagement(req, res) {
        try {
            let pageData = {};
            pageData[this.const.cartItems] = this.util.getCartItemsCount(req);
            pageData[this.const.userManagementError] = req.flash(this.const.userManagementError);
            pageData[this.const.userManagementUsers] = await this.dal.getAllUsersExcept(req.user.id);
            res.render('../pages/secure/usermanagement', this.util.constructPageData(req.user, pageData));
        }
        catch (err) {
            this.util.navigateToError(req, res, err);
        }
    }

    async processUserActivation(req, res) {
        try {
            let userId = parseInt(req.body.userid);
            let status = "";
            if (req.body.status === "Deactivate")
                status = "inactive";
            else if (req.body.status === "Activate")
                status = "active";
            else {
                req.flash(this.const.userManagementError, "Invalid property status" + req.body.status);
                res.redirect("/secure/users");
                return;
            }

            await this.dal.updateUserActivationState(userId, status);
            res.redirect("/secure/users");
            return;
        }
        catch (err) {
            this.util.navigateToError(req, res, err);
        }
    }

    async processUserPromotion(req, res) {
        try {

        }
        catch (err) {
            this.util.navigateToError(req, res, err);
        }
    }

    async defaultUserSecret(req, res) {
        try {

        }
        catch (err) {
            this.util.navigateToError(req, res, err);
        }
    }

    validateIsSelfUser(req, res, next) {
        try {
            let userId = parseInt(req.body.userid);
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