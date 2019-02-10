let eType = require('./entity');

let videos = [];
let ingredients = [];
let healthConditions = [];

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

        let propertyMap = {
            "id": "id",
            "name": "name",
            "text": "text",
            "tag": "tag",
            "ingredients": "ingredients",
            "healthConditions": "healthConditions"
        };

        this._entity = new eType("videos", propertyMap, pgPool);

        if (ingredients.length === 0) {
            for (let i = 0; i < 20; i++) {
                ingredients.push({ name: "Ingredient" + i, id: i });
            }
        }

        if (healthConditions.length === 0) {
            for (let i = 0; i < 20; i++) {
                healthConditions.push({ name: "Health condition" + i, id: i });
            }
        }
    }

    static singleton(pgPool) {
        if (this.instance === undefined) {
            this.instance = new healthVideos(pgPool);
        }
        return this.instance;
    }

    createHealthVideo(videoName, videoText, videoTag, ingredients, healthConditions) {
        let healthVideo = {
            name: videoName,
            text: videoText,
            ingredients: ingredients,
            healthConditions: healthConditions,
            tag: videoTag
        };
        return this._entity.createEntity(healthVideo);
    }

    async readHealthVideoById(id) {
        return await this._entity.readEntitiesById(id);
    }

    readHealthVideos() {
        return this._entity.readAllEntities({});
    }

    async updateHealthVideo(id, videoName, videoText, videoTag, ingredients, healthConditions) {
        let healthVideo = {
            name: videoName,
            text: videoText,
            ingredients: ingredients,
            healthConditions: healthConditions,
            tag: videoTag
        };
        return await this._entity.updateEntity(id, healthVideo);
    }

    readIngredients() {
        return new Promise((acc, rej) => {
            try {
                acc(ingredients.map((e) => Object.assign({}, e)));
            }
            catch (ex) {
                rej(ex);
            }
        });
    }

    readIngredientById(id) {
        return new Promise((acc, rej) => {
            try {
                id = parseInt(id);
                let idx = ingredients.findIndex((l) => l.id === id);
                if (ingredients < 0)
                    acc(undefined);
                else
                    acc(Object.assign({}, ingredients[idx]));
            }
            catch (ex) {
                rej(ex);
            }
        });
    }

    readHealthConditions() {
        return new Promise((acc, rej) => {
            try {
                acc(healthConditions.map((e) => Object.assign({}, e)));
            }
            catch (ex) {
                rej(ex);
            }
        });
    }

    readHealthConditionsById(id) {
        return new Promise((acc, rej) => {
            try {
                id = parseInt(id);
                let idx = healthConditions.findIndex((l) => l.id === id);
                if (healthConditions < 0)
                    acc(undefined);
                else
                    acc(Object.assign({}, healthConditions[idx]));
            }
            catch (ex) {
                rej(ex);
            }
        });
    }
}

module.exports = healthVideos;