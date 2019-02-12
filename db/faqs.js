let eType = require('backend-entity').entity;
class faqs {

    constructor(pgPool) {

        this.deleteFAQ = this.deleteFAQ.bind(this);
        this.getFAQ = this.getFAQ.bind(this);
        this.getAllFAQ = this.getAllFAQ.bind(this);
        this.updateFAQ = this.updateFAQ.bind(this);
        this.createFAQ = this.createFAQ.bind(this);

        let propertyMap = {
            "id": "id",
            "Q": 'question',
            "A": "answer"
        };

        this._entity = new eType("faqs", propertyMap, pgPool);
    }

    static singleton(pgPool) {
        if (this.instance === undefined) {
            this.instance = new faqs(pgPool);
        }
        return this.instance;
    }

    async createFAQ(question, answer) {
        let faqObject = { Q: question, A: answer };
        return await this._entity.createEntity(faqObject);
    }

    async updateFAQ(id, question, answer) {
        id = parseInt(id);
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "id", id);
        let faqObject = { Q: question, A: answer };
        return await this._entity.updateEntity(faqObject, filter);
    }

    async deleteFAQ(id) {
        id = parseInt(id);
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "id", id);
        return await this._entity.deleteEntities(filter);
    }

    async getFAQ(id) {
        return await this._entity.readEntitiesById(id);
    }

    async getAllFAQ() {
        return await this._entity.readAllEntities({});
    }
}

module.exports = faqs;