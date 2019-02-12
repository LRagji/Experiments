let eType = require('backend-entity').entity;

class healthVideos {

    constructor(pgPool) {

        this.createHealthVideo = this.createHealthVideo.bind(this);
        this.readHealthVideoById = this.readHealthVideoById.bind(this);
        this.readHealthVideos = this.readHealthVideos.bind(this);
        this.updateHealthVideo = this.updateHealthVideo.bind(this);
        this.readIngredients = this.readIngredients.bind(this);
        this.readIngredientById = this.readIngredientById.bind(this);
        this.readHealthConditions = this.readHealthConditions.bind(this);
        this.readHealthConditionsById = this.readHealthConditionsById.bind(this);
        this.readPaginatedHealthVideos = this.readPaginatedHealthVideos.bind(this);

        let propertyMap = {
            "id": "id",
            "name": "name",
            "text": "text",
            "tag": "tag",
            "ingredients": "ingredients",
            "healthConditions": '"healthConditions"'
        };

        this._entity = new eType("videos", propertyMap, pgPool);

        propertyMap = {
            "id": "id",
            "name": "name"
        };
        this._ingredientsEntity = new eType("ingredients", propertyMap, pgPool);
        this._healthConditionsEnity = new eType("healthConditions", propertyMap, pgPool);
    }

    static singleton(pgPool) {
        if (this.instance === undefined) {
            this.instance = new healthVideos(pgPool);
        }
        return this.instance;
    }

    async createHealthVideo(videoName, videoText, videoTag, ingredients, healthConditions) {
        let healthVideo = {
            name: videoName,
            text: videoText,
            ingredients: ingredients,
            healthConditions: healthConditions,
            tag: videoTag
        };
        return await this._entity.createEntity(healthVideo);
    }

    async readHealthVideoById(id) {
        return await this._entity.readEntitiesById(id);
    }

    async readHealthVideos() {
        return await this._entity.readAllEntities({});
    }

    async readPaginatedHealthVideos(page, size, filter) {
        return await this._entity.readPaginatedEntities(page, size, filter);
    }

    async updateHealthVideo(id, videoName, videoText, videoTag, ingredients, healthConditions) {
        let healthVideo = {
            name: videoName,
            text: videoText,
            ingredients: ingredients,
            healthConditions: healthConditions,
            tag: videoTag
        };
        id = parseInt(id);
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "id", id);
        return await this._entity.updateEntity(healthVideo, filter);
    }

    async readIngredients() {
        return await this._ingredientsEntity.readAllEntities({});
    }

    async readIngredientById(id) {
        return await this._ingredientsEntity.readEntitiesById(id);
    }

    async readHealthConditions() {
        return await this._healthConditionsEnity.readAllEntities({});
    }

    async readHealthConditionsById(id) {
        return await this._healthConditionsEnity.readEntitiesById(id);
    }
}

module.exports = healthVideos;