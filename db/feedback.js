let eType = require('backend-entity').entity;

class feedback {

    constructor(pgPool) {

        this.createFeedback = this.createFeedback.bind(this);
        this.approveComment = this.approveComment.bind(this);
        // this.deleteHealthLink = this.deleteHealthLink.bind(this);
        this.getApprovedCommnetsFor = this.getApprovedCommnetsFor.bind(this);
        // this.getHealthLinkContentFor = this.getHealthLinkContentFor.bind(this);
        // this.isNameTaken = this.isNameTaken.bind(this);

        let propertyMap = {
            "id": "id",
            "userid": "userid",
            "rating": "rating",
            "productid": "productid",
            "timestamp": "timestamp",
            "comment": "comment",
            "status": "status"
        };

        this._entity = new eType("feedback", propertyMap, pgPool);
    }

    static singleton(pgPool) {
        if (this.instance === undefined) {
            this.instance = new feedback(pgPool);
        }
        return this.instance;
    }

    async createFeedback(userid, productid, rating, comment) {

        let feedbackObj = {
            "userid": userid,
            "rating": rating,
            "productid": productid,
            "timestamp": Date.now(),
            "comment": comment,
            "status": 0//Inactive
        };
        return await this._entity.createEntity(feedbackObj);
    }

    async getApprovedCommnetsFor(productId) {
        productId = parseInt(productId, 10);
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "productid", productId);
        filter = this._entity.filterBuilder.addOperatorConditionFor(filter, "equal", "status", 1);
        return await this._entity.readAllEntities(filter);
    }

    async getAllPendingComments() {
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "status", 0);
        return await this._entity.readAllEntities(filter);
    }

    async approveComment(commentId) {
        commentId = parseInt(commentId, 10);
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "id", commentId);
        let commentObj = { "status": 1 };
        let result = await this._entity.updateEntity(commentObj, filter);
        if (result === undefined) {
            throw new Error("Feedback " + commentId + " doesnot exists.");
        }
        else {
            return result;
        }
    }

    // async deleteHealthLink(name) {
    //     let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "name", name);
    //     let result = await this._entity.deleteEntities(filter);
    //     if (result <= 0) throw new Error("Health link " + name + " doesnot exists.");
    // }

    // async updateHealthLink(name, contents) {
    //     let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "name", name);
    //     let healthLinkObj = { "contents": contents };
    //     let result = await this._entity.updateEntity(healthLinkObj, filter);
    //     if (result === undefined) {
    //         throw new Error("Health link " + name + " doesnot exists.");
    //     }
    //     else {
    //         return result;
    //     }
    // }

    // async isNameTaken(name) {
    //     let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "name", name);
    //     let existingEntities = await this._entity.readAllEntities(filter);
    //     return (existingEntities.length > 0);
    // }

    // async getHealthLinkContentFor(name) {
    //     let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "name", name);
    //     let existingEntities = await this._entity.readAllEntities(filter);
    //     if (existingEntities.length > 0) {
    //         return existingEntities[0];
    //     }
    //     else {
    //         throw new Error("Health link " + name + " doesnot exists.");
    //     }
    // }

}

module.exports = feedback;