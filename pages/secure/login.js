let utils = require('../../modules/utilities');
let constants = require('../../modules/constants');

class pageLogin {
    constructor(server, basePath, auth) {
        this.loadRoutes = this.loadRoutes.bind(this);
        this.redirectToPreviousPage = this.redirectToPreviousPage.bind(this);
        this.renderLoginPage = this.renderLoginPage.bind(this);
        this.renderLogout = this.renderLogout.bind(this);

        this.loadRoutes(server, basePath, auth);
    }

    loadRoutes(server, basePath, auth) {
        server.get(basePath + '/login', this.renderLoginPage);
        server.post(basePath + '/login', auth.authenticateLogIn(basePath + "/login"), this.redirectToPreviousPage);
        server.get(basePath + '/logout', auth.authenticatedInterceptor(basePath + '/login'), this.renderLogout);
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
            pageData[constants.error] = req.flash("error");
            pageData[constants.cartItems] = utils.getCartItemsCount(req);
            res.render('../pages/secure/login', utils.constructPageData(req.user, pageData));
        }
    }

    renderLogout(req, res) {
        req.logout();
        req.session.destroy();
        res.redirect('/secure/login');
    }
}
module.exports = pageLogin;