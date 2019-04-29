let eType = require('backend-entity').entity;

Array.prototype.mutate = function (predicate) {
    let idx = 0;
    let accumulator = [];
    while (idx < this.length) {
        if (predicate(this[idx])) {
            accumulator.push(idx);
        }
        idx++;
    }

    return accumulator.map((fetchIdx, offsetIdx) => this.splice(fetchIdx - offsetIdx, 1)[0]);
}

class feedback {

    constructor(pgPool) {

        this.createFeedback = this.createFeedback.bind(this);
        this.approveComment = this.approveComment.bind(this);
        // this.deleteHealthLink = this.deleteHealthLink.bind(this);
        this.getApprovedCommentsForProductIdSortedByLatestFirst = this.getApprovedCommentsForProductIdSortedByLatestFirst.bind(this);
        this._arrangeReplies = this._arrangeReplies.bind(this);
        this.arrangeHierarchicalComments = this.arrangeHierarchicalComments.bind(this);
        // this.getHealthLinkContentFor = this.getHealthLinkContentFor.bind(this);
        // this.isNameTaken = this.isNameTaken.bind(this);
        this.readCommentById = this.readCommentById.bind(this);

        let propertyMap = {
            "id": "id",
            "userid": "userid",
            "rating": "rating",
            "productid": "productid",
            "timestamp": "timestamp",
            "comment": "comment",
            "status": "status",
            "reply": "reply"
        };

        this._entity = new eType("feedback", propertyMap, pgPool);
    }

    static singleton(pgPool) {
        if (this.instance === undefined) {
            this.instance = new feedback(pgPool);
        }
        return this.instance;
    }

    async readCommentById(commentid) {
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "id", commentid);
        return await this._entity.readAllEntities(filter);
    }

    async createFeedback(userid, productid, rating, comment, reply = -1) {

        let feedbackObj = {
            "userid": userid,
            "rating": rating,
            "productid": productid,
            "timestamp": Date.now(),
            "comment": comment,
            "status": 0,//Inactive
            "reply": reply //Since this is feedback -1 else reference id of the reply comment.
        };
        return await this._entity.createEntity(feedbackObj);
    }

    async getApprovedCommentsForProductIdSortedByLatestFirst(productId) {
        productId = parseInt(productId, 10);
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "productid", productId);
        filter = this._entity.filterBuilder.addOperatorConditionFor(filter, "equal", "status", 1);
        filter = this._entity.filterBuilder.sortByConditionFor(filter, "id", false, 0);
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

    arrangeHierarchicalComments(allComments) {
        let arrangedComments = [];
        let infiniteLoopWatchDog = 0;
        while (allComments.length > 0) {
            let currentComment = allComments.shift();
            if (currentComment.reply === -1) {
                currentComment = this._arrangeReplies(currentComment, allComments);
                arrangedComments.push(currentComment);
                infiniteLoopWatchDog = 0;
            }
            else {
                allComments.push(currentComment);
                if (infiniteLoopWatchDog > allComments.length) {
                    throw new Error("Infinite loop detected with comments.")
                    //Infinite loop detected;
                    break;
                }
                infiniteLoopWatchDog++;
            }
        }
        return arrangedComments;
    }

    _arrangeReplies(currentComment, comments) {
        currentComment.replies = [];
        let repliesForCurrentComment = comments.mutate((c) => c.reply == currentComment.id);

        while (repliesForCurrentComment.length > 0) {
            let reply = repliesForCurrentComment.shift();
            currentComment.replies.push(this._arrangeReplies(reply, comments));
        }

        return currentComment;
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