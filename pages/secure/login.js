let page = require('../../modules/page')//This is intentionally derived from page and not secure page as this page is gateway to secure world.
class pageLogin extends page {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService, textService) {
        super(dataAccessService, utilityService, constantsService, textService);

        this.loadRoutes = this.loadRoutes.bind(this);
        this.redirectToPreviousPage = this.redirectToPreviousPage.bind(this);
        this.renderLoginPage = this.renderLoginPage.bind(this);
        this.renderLogout = this.renderLogout.bind(this);
        this.registerUser = this.registerUser.bind(this);

        this.loadRoutes(server, basePath, auth);
    }

    loadRoutes(server, basePath, auth) {
        server.get(basePath + '/login', this.safeRender(this.renderLoginPage));
        server.post(basePath + '/login', auth.authenticateLogIn(this.loginPageUrl), this.safeRender(this.redirectToPreviousPage));
        server.get(basePath + '/logout', auth.authenticatedInterceptor(this.loginPageUrl), this.safeRender(this.renderLogout));
        server.post(basePath + '/login/register', this.safeRender(this.registerUser));
    }

    redirectToPreviousPage(req, renderView, renderRedirect) {
        if (req.session.returnTo === undefined)
            renderRedirect("/");
        else {
            renderRedirect(req.session.returnTo);
            delete req.session.returnTo;
        }
    }

    async renderLoginPage(req, renderView, renderRedirect) {
        if (req.user !== undefined) {
            renderRedirect("/secure/profile");
        }
        else {
            let pageData = {};
            pageData[this.const.loginError] = req.flash("error");
            pageData[this.const.registerError] = req.flash("registerError");
            renderView('../pages/secure/login', pageData);
        }
    }

    renderLogout(req, renderView, renderRedirect) {
        req.logout();
        req.session.destroy();
        renderRedirect('/secure/login');
    }

    async registerUser(req, renderView, renderRedirect) {

        if (this.util.validateIsInOptions(req.body.registerSalutation, this.const.salutations) === false) {
            req.flash("registerError", "Invalid Salutation.");
            renderRedirect("/secure/login?tab=register");
            return;
        }
        if (this.util.validateLength(req.body.registerFirstName, 50, 1) === false) {
            req.flash("registerError", "Invalid First name [1-50].");
            renderRedirect("/secure/login?tab=register");
            return;
        }
        if (this.util.validateLength(req.body.registerLastName, 50, 1) === false) {
            req.flash("registerError", "Invalid Last name [1-50].");
            renderRedirect("/secure/login?tab=register");
            return;
        }
        if (this.util.validateMobilePhone(req.body.registerPhone) === false) {
            req.flash("registerError", "Invalid Phone.");
            renderRedirect("/secure/login?tab=register");
            return;
        }
        if (this.util.validateEmail(req.body.registerEmail) === false) {
            req.flash("registerError", "Invalid Email.");
            renderRedirect("/secure/login?tab=register");
            return;
        }
        if (this.util.validateLength(req.body.registerPass, 50, 1) === false) {
            req.flash("registerError", "Invalid Password [50,1].");
            renderRedirect("/secure/login?tab=register");
            return;
        }
        if (await this.dal.getUserByEmail(req.body.registerEmail) !== undefined) {
            req.flash("registerError", "User with email address already exists.");
            renderRedirect("/secure/login?tab=register");
            return;
        }

        await this.dal.createUser(req.body.registerSalutation,
            req.body.registerFirstName,
            req.body.registerLastName,
            req.body.registerPhone,
            req.body.registerEmail,
            req.body.registerPass);
        renderRedirect("/secure/login");
    }
}
module.exports = pageLogin;