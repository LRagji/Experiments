let eType = require('backend-entity').entity;
let util = require('../modules/utilities');
class users {

    constructor(pgPool) {

        this.getUserByEmail = this.getUserByEmail.bind(this);
        this.createUser = this.createUser.bind(this);
        this.updateUserPassword = this.updateUserPassword.bind(this);//TODO:This can be update user call instead.
        this.getAllUsersPagedExcept = this.getAllUsersPagedExcept.bind(this);
        this.updateUserActivationState = this.updateUserActivationState.bind(this);
        this.updateUserAccountType = this.updateUserAccountType.bind(this);
        this.resetUserAccountPassword = this.resetUserAccountPassword.bind(this);
        this.getUsersByIds = this.getUsersByIds.bind(this);

        let propertyMap = {
            "id": "id",
            "salutation": "salutation",
            "first": '"firstName"',
            "last": '"lastName"',
            "mobile": "mobile",
            "email": "email",
            "password": "password",
            "status": "status",
            "type": "type"
        };

        this._entity = new eType("users", propertyMap, pgPool);
    }

    static singleton(pgPool) {
        if (this.instance === undefined) {
            this.instance = new users(pgPool);
        }
        return this.instance;
    }

    async createUser(salutation, firstName, lastName, mobile, email, password, type) {
        if (type !== "admin" & type !== "normal") type = "normal";
        let newUser = {
            salutation: salutation,
            first: firstName,
            last: lastName,
            mobile: mobile,
            email: email,
            password: util.getHash(password),
            status: "active",
            type: type
        }
        return await this._entity.createEntity(newUser);
    }

    async getUsersByIds(ids) {
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "in", "id", ids);
        return await this._entity.readAllEntities(filter);
    }

    async getUserByEmail(email) {
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "email", email);
        let existingEntry = await this._entity.readAllEntities(filter);
        return existingEntry[0];
    }

    async getAllUsersPagedExcept(pageNo, size, userId) {
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "notequal", "id", userId);
        let users = await this._entity.readPaginatedEntities(pageNo, size, filter);
        return users.results;
    }

    async updateUserActivationState(userId, status) {
        let user = { "status": status };
        userId = parseInt(userId);
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "id", userId);
        let result = await this._entity.updateEntity(user, filter);
        if (result.length <= 0)
            throw new new Error("User with id" + userId + " not found.");
        else
            return result;
    }

    async updateUserAccountType(userId, accountType) {
        let user = { "type": accountType };
        userId = parseInt(userId);
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "id", userId);
        let result = await this._entity.updateEntity(user, filter);
        if (result.length <= 0)
            throw new new Error("User with id" + userId + " not found.");
        else
            return result;
    }

    async resetUserAccountPassword(userId) {
        return await this.updateUserPassword(userId, "P@55word");
    }

    async updateUserPassword(userId, password) {
        let user = { "password": util.getHash(password) };
        userId = parseInt(userId);
        let filter = this._entity.filterBuilder.addOperatorConditionFor({}, "equal", "id", userId);
        let result = await this._entity.updateEntity(user, filter);
        if (result.length <= 0)
            throw new new Error("User with id" + userId + " not found.");
        else
            return result;
    }
}

module.exports = users;