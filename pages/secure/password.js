class pagePassword {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService) {
        this.dal = dataAccessService;
        this.util = utilityService;
        this.const = constantsService;

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderPassword = this.renderPassword.bind(this);
        this.changePassword = this.changePassword.bind(this);

        this.loadRoutes(server, basePath, auth);
    }

    loadRoutes(server, basePath, auth) {
        server.get(basePath + '/password', auth.authenticatedInterceptor(basePath + '/login'), this.renderPassword);
        server.post(basePath + '/password', auth.authenticatedInterceptor(basePath + '/login'), this.changePassword);
    }

    async renderPassword(req, res) {
        try {
            let pageData = {};
            pageData[this.const.cartItems] = this.util.getCartItemsCount(req);
            pageData[this.const.changePassError] = req.flash(this.const.changePassError);
            res.render('../pages/secure/password', await this.util.constructPageData(req.user, pageData, this.dal));
        }

        catch (err) {
            this.util.navigateToError(req, res, err);
        }
    }

    async changePassword(req, res) {
        try {

            if (this.util.validateLength(req.body.existingPassword, 50, 1) === false) {
                req.flash(this.const.changePassError, "Invalid existing password length [50,1]");
                res.redirect("./password");
                return;
            }

            if (this.util.validateLength(req.body.newPassword, 50, 1) === false) {
                req.flash(this.const.changePassError, "Invalid new password length [50,1]");
                res.redirect("./password");
                return;
            }

            if (this.util.getHash(req.body.existingPassword) !== req.user.password) {
                req.flash(this.const.changePassError, "Invalid/Incorrect existing password.");
                res.redirect("./password");
                return;
            }

            await this.dal.updateUserPassword(req.user.id, req.body.newPassword);

            res.redirect("./logout");

        }
        catch (err) {
            this.util.navigateToError(req, res, err);
        }
    }

}

module.exports = pagePassword;