let securePage = require('../../modules/securePage')
class pageProfile extends securePage {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService, textService) {
        super(auth, dataAccessService, utilityService, constantsService, textService);

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderProfile = this.renderProfile.bind(this);
        this.createMenu = this.createMenu.bind(this);

        this.loadRoutes(server, basePath);
    }

    loadRoutes(server, basePath) {
        server.get(basePath + '/profile', this.safeRender(this.renderProfile));
    }

    async renderProfile(req, renderView) {
        let pageData = {};
        pageData[this.const.menu] = this.createMenu(req.user);
        renderView('../pages/secure/profile', pageData);
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

        if (this.util.isAdmin(user)) {
            menuItems.push({
                icon: "fas fa-cube",
                url: "/secure/products",
                name: "Product Management"
            });
            menuItems.push({
                icon: "far fa-square",
                url: "/secure/banner",
                name: "Banner Management"
            });
            menuItems.push({
                icon: "fas fa-users",
                url: "/secure/users",
                name: "User Management"
            });
            menuItems.push({
                icon: "fa fa-link",
                url: "/secure/healthlinks",
                name: "Health Links"
            });
            menuItems.push({
                icon: "fas fa-question",
                url: "/secure/faqs",
                name: "F.A.Q's"
            });
            menuItems.push({
                icon: "fas fa-cogs",
                url: "/secure/settings",
                name: "App Settings"
            });
            menuItems.push({
                icon: "fas fa-journal-whills",
                url: "/secure/healthtopics",
                name: "Health Topics"
            });
        }
        return menuItems;
    }
}
module.exports = pageProfile;