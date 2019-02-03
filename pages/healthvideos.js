let page = require('../modules/page')
class pageHealthVideos extends page {
    constructor(server, dataAccessService, utilityService, constantsService, textService) {
        super(dataAccessService, utilityService, constantsService, textService);

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderVideos = this.renderVideos.bind(this);

        this.loadRoutes(server);
    }

    loadRoutes(server) {
        server.get('/healthvideos', this.safeRender(this.renderVideos));
    }

    async renderVideos(req, renderView) {
        let healthVideos = await this.dal.healthVideos.readHealthVideos();
        let healthConditions = [], ingredients = [], foundIngredientsId = [], foundHealthConditionId = [];
        healthVideos.forEach(video => {
            video.healthConditions.forEach((healthCondition) => {
                if (foundHealthConditionId.indexOf(healthCondition) < 0) {
                    healthConditions.push(this.dal.healthVideos.readHealthConditionsById(healthCondition));
                    foundHealthConditionId.push(healthCondition);
                }
            });
            video.ingredients.forEach((ingredient) => {
                if (foundIngredientsId.indexOf(ingredient) < 0) {
                    ingredients.push(this.dal.healthVideos.readIngredientById(ingredient));
                    foundIngredientsId.push(ingredient);
                }
            });
        });

        ingredients = await Promise.all(ingredients);
        healthConditions = await Promise.all(healthConditions);
        let pageData = {};
        pageData[this.const.healthConditions] = this.util.sortArrayByProperty(await healthConditions, "name");
        pageData[this.const.ingredients] = this.util.sortArrayByProperty(await ingredients, "name");
        pageData[this.const.healthVideos] = this.util.sortArrayByProperty(await this.dal.healthVideos.readHealthVideos(), "name");
        renderView('../pages/healthvideos', pageData);
    }
}
module.exports = pageHealthVideos