let brandsArray = [];
let eType = require('backend-entity').entity;

class brands {

    constructor(pgPool) {

        this.createBrand = this.createBrand.bind(this);
        this.readBrands = this.readBrands.bind(this);
        this.updateBrand = this.updateBrand.bind(this);

        let propertyMap = {
            "id": "id",
            "name": "name",
            "website": "website"
        };

        this._entity = new eType("brands", propertyMap, pgPool);
    }

    static singleton(pgPool) {
        if (this.instance === undefined) {
            this.instance = new brands(pgPool);
        }
        return this.instance;
    }

    async createBrand(brandName, brandWebsite) {
        let brand = { name: brandName, website: brandWebsite };
        return await this._entity.createEntity(brand);
    }

    async readBrands() {
        return await this._entity.readAllEntities({});
    }

    async readBrandById(id) {
        return await this._entity.readEntitiesById(id);
    }


    async updateBrand(id, brandName, brandWebsite) {
        id = parseInt(id);
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "id", id);
        let updateEntity = { name: brandName, website: brandWebsite };
        return await this._entity.updateEntity(updateEntity, filter);
    }
}

module.exports = brands;