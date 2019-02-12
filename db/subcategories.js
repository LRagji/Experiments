let subCategoriesArray = [];
let eType = require('backend-entity').entity;

class subcategories {

    constructor(pgPool) {

        this.readAllSubCategories = this.readAllSubCategories.bind(this);
        this.createSubCategory = this.createSubCategory.bind(this);
        this.updateSubCategory = this.updateSubCategory.bind(this);
        //this.readSubCategoryId = this.readSubCategoryId.bind(this);

        let propertyMap = {
            "id": "id",
            "catid": '"categoryId"',
            "name": "name"
        };

        this._entity = new eType("subCategories", propertyMap, pgPool);
    }

    static singleton(pgPool) {
        if (this.instance === undefined) {
            this.instance = new subcategories(pgPool);
        }
        return this.instance;
    }

    async createSubCategory(categoryId, subCatName) {
        categoryId = parseInt(categoryId);
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "name", subCatName);
        let existingEntry = await this._entity.readAllEntities(filter);
        if (existingEntry.length > 0) throw new Error(subCatName + " name already exists.");

        let subCategrory = {
            "catid": categoryId,
            "name": subCatName
        };
        await this._entity.createEntity(subCategrory);
    }

    async readAllSubCategories() {
        return await this._entity.readAllEntities({});
    }

    async updateSubCategory(id, categoryId, subCatName) {
        let subCategrory = {
            "catid": categoryId,
            "name": subCatName
        };
        id = parseInt(id);
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "id", id);
        return await this._entity.updateEntity(subCategrory, filter);
    }
}

module.exports = subcategories;