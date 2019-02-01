let videos = [];
let ingredients = [];
let healthConditions = [];

class healthVideos {

    constructor() {

        this.createHealthVideo = this.createHealthVideo.bind(this);
        this.readHealthVideoById = this.readHealthVideoById.bind(this);
        this.readHealthVideos = this.readHealthVideos.bind(this);
        this.updateHealthVideo = this.updateHealthVideo.bind(this);
        this.readIngredients = this.readIngredients.bind(this);
        this.readIngredientById = this.readIngredientById.bind(this);
        this.readHealthConditions = this.readHealthConditions.bind(this);
        this.readHealthConditionsById = this.readHealthConditionsById.bind(this);

        if (videos.length === 0) {
            for (let i = 0; i < 20; i++) {
                this.createHealthVideo("Laukik" + i, "Video Text", '<iframe width="560" height="315" src="https://www.youtube.com/embed/nm1lYAvx2mw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', [], []);
            }
        }

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

    static singleton() {
        if (this.instance === undefined) {
            this.instance = new healthVideos();
        }
        return this.instance;
    }

    createHealthVideo(videoName, videoText, videoTag, ingredients, healthConditions) {
        return new Promise((acc, rej) => {
            try {
                let healthVideo = { name: videoName, id: videos.length, text: videoText, ingredients: ingredients, healthConditions: healthConditions, videoTag: videoTag };
                videos.push(healthVideo);
                acc(healthVideo);
            }
            catch (ex) {
                rej(ex);
            }
        });
    }

    readHealthVideoById(id) {
        return new Promise((acc, rej) => {
            try {
                id = parseInt(id);
                let idx = videos.findIndex((l) => l.id === id);
                if (idx < 0)
                    acc(undefined);
                else
                    acc(Object.assign({}, videos[idx]));
            }
            catch (ex) {
                rej(ex);
            }
        });
    }

    readHealthVideos() {
        return new Promise((acc, rej) => {
            try {
                acc(videos.map((e) => Object.assign({}, e)));
            }
            catch (ex) {
                rej(ex);
            }
        });
    }

    updateHealthVideo(id, videoName, videoText, videoTag, ingredients, healthConditions) {
        return new Promise((acc, rej) => {
            try {
                id = parseInt(id);
                let foundVideos = videos.filter((e) => e.id === id);
                if (foundVideos.length > 0) {
                    foundVideos[0].name = videoName;
                    foundVideos[0].text = videoText;
                    foundVideos[0].videoTag = videoTag;
                    foundVideos[0].ingredients = ingredients;
                    foundVideos[0].healthConditions = healthConditions;
                    acc(Object.assign({}, foundVideos[0]));
                }
                else {
                    acc(undefined);
                }
            }
            catch (ex) {
                rej(ex);
            }
        });
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