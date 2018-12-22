let utils = require('../../modules/utilities');
let constants = require('../../modules/constants');
let pgDal = require('../../db/dataAccessLayer');
let dal = new pgDal();

class pageLogin {
    constructor(server, basePath, auth) {
        this.loadRoutes = this.loadRoutes.bind(this);
        this.redirectToPreviousPage = this.redirectToPreviousPage.bind(this);
        this.renderLoginPage = this.renderLoginPage.bind(this);
        this.renderLogout = this.renderLogout.bind(this);
        this.registerUser = this.registerUser.bind(this);

        this.loadRoutes(server, basePath, auth);
    }

    loadRoutes(server, basePath, auth) {
        server.get(basePath + '/login', this.renderLoginPage);
        server.post(basePath + '/login', auth.authenticateLogIn(basePath + "/login"), this.redirectToPreviousPage);
        server.get(basePath + '/logout', auth.authenticatedInterceptor(basePath + '/login'), this.renderLogout);
        server.post(basePath + '/login/register', this.registerUser);
    }

    redirectToPreviousPage(req, res) {
        if (req.session.returnTo === undefined)
            res.redirect("/");
        else {
            res.redirect(req.session.returnTo);
            delete req.session.returnTo;
        }
    }

    renderLoginPage(req, res) {
        if (req.user !== undefined) {
            res.redirect("/secure/profile");
        }
        else {
            let pageData = {};
            pageData[constants.loginError] = req.flash("error");
            pageData[constants.registerError] = req.flash("registerError");
            pageData[constants.cartItems] = utils.getCartItemsCount(req);
            res.render('../pages/secure/login', utils.constructPageData(req.user, pageData));
        }
    }

    renderLogout(req, res) {
        req.logout();
        req.session.destroy();
        res.redirect('/secure/login');
    }

    async registerUser(req, res) {
        try {
            let existingUser = await dal.getUserByEmail(req.body.registerEmail);
            if (existingUser === undefined) {
                let newUser = await dal.createUser(req.body.registerSalutation,
                    req.body.registerFirstName,
                    req.body.registerLastName,
                    req.body.registerPhone,
                    req.body.registerEmail,
                    req.body.registerPass);
                res.redirect("/secure/login");
            }
            else {
                req.flash("registerError", "User with email address already exists.");
                res.redirect("/secure/login?tab=register");
            }
        }
        catch (err) {
            utils.navigateToError(req, res, err);
        }
    }
}
module.exports = pageLogin;