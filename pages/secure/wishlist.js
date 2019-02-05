let securePage = require('../../modules/securePage')
class pageWishlist extends securePage {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService, textService) {
        super(auth, dataAccessService, utilityService, constantsService, textService);

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderProfile = this.renderProfile.bind(this);

        this.loadRoutes(server, basePath);
    }

    loadRoutes(server, basePath) {
        server.get(basePath + '/wishlist', this.safeRender(this.renderProfile));
    }

    async renderProfile(req, renderView) {
        let pageData = {};
        pageData[this.const.menu] = [];
        renderView('../pages/secure/wishlist', pageData);
    }
}
module.exports = pageWishlist;