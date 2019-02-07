let securePage = require('../../modules/securePage')
class pageWishlist extends securePage {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService, textService) {
        super(auth, dataAccessService, utilityService, constantsService, textService);

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderProfile = this.renderProfile.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.loadRoutes(server, basePath);
    }

    loadRoutes(server, basePath) {
        server.get(basePath + '/wishlist', this.safeRender(this.renderProfile));
        server.post(basePath + '/wishlist/delete', this.safeRender(this.handleDelete));
    }

    async renderProfile(req, renderView) {
        let pageData = {};
        pageData[this.const.wishlist] = await this.dal.products.readProducts(await this.dal.wishlist.readAllWishlist());
        renderView('../pages/secure/wishlist', pageData);
    }

    async handleDelete(req, renderView, renderRedirect) {
        req.body.id = parseInt(req.body.id);
        await this.dal.wishlist.deleteWishlist(req.body.id);
        renderRedirect("/secure/wishlist");
        return;
    }
}
module.exports = pageWishlist;