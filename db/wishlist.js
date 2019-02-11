let eType = require('backend-entity').entity;
class wishlist {

    constructor(pgPool) {

        this.createWishlist = this.createWishlist.bind(this);
        this.readAllWishlist = this.readAllWishlist.bind(this);
        this.deleteWishlist = this.deleteWishlist.bind(this);

        let propertyMap = {
            "id": "id",
            "productid": '"productId"',
            "userid": '"userId"'
        };

        this._entity = new eType("wishlist", propertyMap, pgPool);
    }

    static singleton(pgPool) {
        if (this.instance === undefined) {
            this.instance = new wishlist(pgPool);
        }
        return this.instance;
    }

    async createWishlist(productId, userId) {
        productId = parseInt(productId);
        userId = parseInt(userId);

        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "productid", productId);
        filter = this._entity.filterBuilder.addOperatorConditionFor(filter, "equal", "userid", userId);
        let existingEntry = await this._entity.readAllEntities(filter);
        if (existingEntry.length <= 0) {
            return await this._entity.createEntity({ "productid": productId, "userid": userId });
        }
        return existingEntry[0];
    }

    async readAllWishlist(userId) {
        userId = parseInt(userId);
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "userid", userId);
        return await this._entity.readAllEntities(filter);
    }

    async deleteWishlist(productId, userId) {
        userId = parseInt(userId);
        productId = parseInt(productId);
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "productid", productId);
        filter = this._entity.filterBuilder.addOperatorConditionFor(filter, "equal", "userid", userId);
        return await this._entity.deleteEntities(filter);
    }

}

module.exports = wishlist;