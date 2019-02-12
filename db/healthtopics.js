let eType = require('backend-entity').entity;

class healthTopics {

    constructor(pgPool) {

        this.createHealthTopic = this.createHealthTopic.bind(this);
        this.readHealthTopics = this.readHealthTopics.bind(this);
        this.updateHealthTopic = this.updateHealthTopic.bind(this);
        this.readHealthTopicById = this.readHealthTopicById.bind(this);

        let propertyMap = {
            "id": "id",
            "name": "name"
        };

        this._entity = new eType("healthTopics", propertyMap, pgPool);
    }

    static singleton(pgPool) {
        if (this.instance === undefined) {
            this.instance = new healthTopics(pgPool);
        }
        return this.instance;
    }

    async createHealthTopic(topicName) {
        return await this._entity.createEntity({ name: topicName });
    }

    async readHealthTopicById(id) {
        return await this._entity.readEntitiesById(id);
    }

    async readHealthTopics() {
        return await this._entity.readAllEntities({});
    }

    async updateHealthTopic(id, topicName) {
        id = parseInt(id);
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "id", id);
        let updateEntity = { "name": topicName };
        return await this._entity.updateEntity(updateEntity, filter);
    }
}

module.exports = healthTopics;