let healthLinksArray = [];
let eType = require('backend-entity').entity;


class healthLinks {

    constructor(pgPool) {

        this.createHealthLink = this.createHealthLink.bind(this);
        this.updateHealthLink = this.updateHealthLink.bind(this);
        this.deleteHealthLink = this.deleteHealthLink.bind(this);
        this.getAllHealthLinks = this.getAllHealthLinks.bind(this);
        this.getHealthLinkContentFor = this.getHealthLinkContentFor.bind(this);
        this.isNameTaken = this.isNameTaken.bind(this);

        let propertyMap = {
            "id": "id",
            "name": "name",
            "url": "url",
            "contents": "contents"
        };

        this._entity = new eType("healthLinks", propertyMap, pgPool);
    }

    static singleton(pgPool) {
        if (this.instance === undefined) {
            this.instance = new healthLinks(pgPool);
        }
        return this.instance;
    }

    async getAllHealthLinks() {
        return await this._entity.readAllEntities({});
    }

    async createHealthLink(name, contents) {
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "name", name);
        let existingEntities = await this._entity.readAllEntities(filter);
        if (existingEntities.length > 0) {
            throw new Error(name + " name already exists.");
        }
        else {
            let healthLinkObj = {
                "name": name,
                "url": "/healthLinks?id=" + encodeURIComponent(name),
                "contents": contents
            };
            return await this._entity.createEntity(healthLinkObj);
        }
    }

    async deleteHealthLink(name) {
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "name", name);
        let result = await this._entity.deleteEntities(filter);
        if (result <= 0) throw new Error("Health link " + name + " doesnot exists.");
    }

    async updateHealthLink(name, contents) {
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "name", name);
        let healthLinkObj = { "contents": contents };
        let result = await this._entity.updateEntity(healthLinkObj, filter);
        if (result === undefined) {
            throw new Error("Health link " + name + " doesnot exists.");
        }
        else {
            return result;
        }
    }

    async isNameTaken(name) {
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "name", name);
        let existingEntities = await this._entity.readAllEntities(filter);
        return (existingEntities.length > 0);
    }

    async getHealthLinkContentFor(name) {
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "name", name);
        let existingEntities = await this._entity.readAllEntities(filter);
        if (existingEntities.length > 0) {
            return existingEntities[0];
        }
        else {
            throw new Error("Health link " + name + " doesnot exists.");
        }
    }

}

module.exports = healthLinks;