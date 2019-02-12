let eType = require('backend-entity').entity;
class appSettings {

    constructor(constantService, pgPool) {
        this.const = constantService;

        this.settings = {};
        this.settings[this.const.taxSettingsKey] = 10;

        this.createSetting = this.createSetting.bind(this);
        this.readSetting = this.readSetting.bind(this);
        this.updateSetting = this.updateSetting.bind(this);
        this.deleteSetting = this.deleteSetting.bind(this);
        this.readAllSettings = this.readAllSettings.bind(this);

        let propertyMap = {
            "id": "id",
            "key": "key",
            "value": "value"
        };

        this._entity = new eType("appSettings", propertyMap, pgPool);
    }

    static singleton(constantService, pgPool) {
        if (this.instance === undefined) {
            this.instance = new appSettings(constantService, pgPool);
        }
        return this.instance;
    }

    async createSetting(key, value) {
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "key", key);
        let existingEntry = await this._entity.readAllEntities(filter);
        if (existingEntry.length <= 0) {
            return await this._entity.createEntity({ "key": key, "value": value });
        }
        else {
            return existingEntry[0];
        }
    }

    async readSetting(key) {
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "key", key);
        let existingEntry = await this._entity.readAllEntities(filter);
        return existingEntry[0]["value"];
    }

    async readAllSettings() {
        return await this._entity.readAllEntities({});
    }

    async updateSetting(key, value) {
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "key", key);
        let updateEntity = { "value": value };
        return await this._entity.updateEntity(updateEntity, filter);
    }

    async deleteSetting(key) {
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "key", key);
        return await this._entity.deleteEntities(filter);
    }
}

module.exports = appSettings;