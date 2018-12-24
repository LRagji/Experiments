class pageProfile {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService ) {
        this.dal = dataAccessService;
        this.util = utilityService;
        this.const = constantsService;

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderProfile = this.renderProfile.bind(this);
        this.createMenu = this.createMenu.bind(this);

        this.loadRoutes(server, basePath, auth);
    }

    loadRoutes(server, basePath, auth) {
        server.get(basePath + '/profile', auth.authenticatedInterceptor(basePath + '/login'), this.renderProfile);
    }

    renderProfile(req, res) {
        try {
            let pageData = {};

            pageData[this.const.menu] = this.createMenu(req.user);
            pageData[this.const.cartItems] = this.util.getCartItemsCount(req);
            res.render('../pages/secure/profile', this.util.constructPageData(req.user, pageData));
        }
        catch (err) {
            this.util.navigateToError(req, res, err);
        }
    }

    createMenu(user) {
        let menuItems = [];
       
        menuItems.push({
            icon: "fas fa-shipping-fast",
            url: "/secure/orders",
            name: "Orders"
        });
        menuItems.push({
            icon: "fas fa-key",
            url: "/secure/password",
            name: "Change Password"
        });
        menuItems.push({
            icon: "fas fa-sign-out-alt",
            url: "/secure/logout",
            name: "Logout"
        });
        switch (user.meta.type) {
            case "admin":
            menuItems.push({
                icon: "fas fa-cube",
                url: "/secure/products",
                name: "Product Management"
            });
            menuItems.push({
                icon: "far fa-square",
                url: "/secure/banner",
                name: "Banner Management"
            })
            menuItems.push({
                icon: "fas fa-users",
                url: "/secure/users",
                name: "User Management"
            })
                break;
        }
        return menuItems;
    }
}
module.exports = pageProfile;