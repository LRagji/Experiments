let adminPage = require('../../modules/adminPage');
class secureAPI extends adminPage {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService, textService) {
        super(auth, dataAccessService, utilityService, constantsService, textService)

        this.loadRoutes = this.loadRoutes.bind(this);
        this.getUsers = this.getUsers.bind(this);

        this.loadRoutes(server, basePath);

    }

    loadRoutes(server, basePath) {
        server.get(basePath + '/v1/users', this.safeApi(this.getUsers));
    }

    async getUsers(req, renderResponse) {

        let page = parseInt(req.query.page);
        let size = parseInt(req.query.size);
        let userId = parseInt(req.user.id);

        let users = await this.dal.users.getAllUsersPagedExcept(page, size, userId);
        if (users.length >= size - 1)// This is cause we are explicitly removing the current user.
            renderResponse(206, users);
        else
            renderResponse(200, users);

    }
}
module.exports = secureAPI;