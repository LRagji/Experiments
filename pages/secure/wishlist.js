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
        let productIds = await this.dal.wishlist.readAllWishlist(req.user.id);
        productIds = productIds.map(e => e.productId);
        let wishedProducts = await this.dal.products.readProducts(productIds);
        if (wishedProducts.length < productIds.length) {
            let productsToRemove = productIds.filter((pid) => wishedProducts.find((p) => p.id === pid) === undefined);
            await Promise.all(productsToRemove.map((productId) => {
                this.dal.wishlist.deleteWishlist(productId, req.user.id);
            }));
        }
        pageData[this.const.wishlist] = wishedProducts;
        renderView('../pages/secure/wishlist', pageData);
    }

    async handleDelete(req, renderView, renderRedirect) {
        req.body.id = parseInt(req.body.id);
        await this.dal.wishlist.deleteWishlist(req.body.id, req.user.id);
        renderRedirect("/secure/wishlist");
        return;
    }
}
module.exports = pageWishlist;