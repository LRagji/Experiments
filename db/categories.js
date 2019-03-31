
let eType = require('backend-entity').entity;

class categories {

    constructor(pgPool) {

        this.readAllCategories = this.readAllCategories.bind(this);
        this.createCategory = this.createCategory.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.readCategoryId = this.readCategoryId.bind(this);
        this.retriveCategoryByName = this.retriveCategoryByName.bind(this);
        this.readAllMenuCategories = this.readAllMenuCategories.bind(this);

        let propertyMap = {
            "id": "id",
            "name": "name",
            "showonmenu": "showonmenu"
        };

        this._entity = new eType("categories", propertyMap, pgPool);
    }

    static singleton(pgPool) {
        if (this.instance === undefined) {
            this.instance = new categories(pgPool);
        }
        return this.instance;
    }

    async createCategory(name, showCategoryOnMenu = 0) {
        let result = await this.retriveCategoryByName(name);
        if (result === undefined) throw new Error(name + " name already exists.");
        if (showCategoryOnMenu !== 1) showCategoryOnMenu = 0;
        return await this._entity.createEntity({ "name": name, "showonmenu": showCategoryOnMenu });
    }

    async retriveCategoryByName(name) {
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "name", name);
        return await this._entity.readAllEntities(filter);
    }

    async readCategoryId(id) {
        return await this._entity.readEntitiesById(id);
    }

    async readAllCategories() {
        return await this._entity.readAllEntities({});
    }

    async readAllMenuCategories() {
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "showonmenu", 1);
        return await this._entity.readAllEntities(filter);
    }

    async updateCategory(id, name, showCategoryOnMenu) {
        id = parseInt(id);
        showCategoryOnMenu = parseInt(showCategoryOnMenu);
        if (showCategoryOnMenu !== 1) showCategoryOnMenu = 0;
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "id", id);
        return await this._entity.updateEntity({ "name": name, "showonmenu": showCategoryOnMenu }, filter);
    }
}

module.exports = categories;