let categoriesArray = [];
let eType = require('./entity');

class categories {

    constructor(pgPool) {

        this.readAllCategories = this.readAllCategories.bind(this);
        this.createCategory = this.createCategory.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.readCategoryId = this.readCategoryId.bind(this);
        this.retriveCategoryByName = this.retriveCategoryByName.bind(this);

        let propertyMap = {
            "id": "id",
            "name": "name"
        };

        this._entity = new eType("categories", propertyMap, pgPool);
    }

    static singleton(pgPool) {
        if (this.instance === undefined) {
            this.instance = new categories(pgPool);
        }
        return this.instance;
    }

    async createCategory(name) {
        let results = await this.retriveCategoryByName(name);
        if (results.length > 0) throw new Error(name + " name already exists.");
        return await this._entity.createEntity({ "name": name });
    }

    async retriveCategoryByName(name) {
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "name", name);
        return await this._entity.readAllEntities(filter);
    }

    async readCategoryId(id) {
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "id", id);
        return await this._entity.readAllEntities(filter);
    }

    async readAllCategories() {
        return await this._entity.readAllEntities({});
    }

    async updateCategory(id, name) {
        return await this._entity.updateEntity(id, { "name": name });
    }
}

module.exports = categories;