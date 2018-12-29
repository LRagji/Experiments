class secureAPI {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService) {
        this.dal = dataAccessService;
        this.util = utilityService;
        this.const = constantsService;

        this.loadRoutes = this.loadRoutes.bind(this);
        this.getUsers = this.getUsers.bind(this);

        this.loadRoutes(server, basePath, auth);

    }

    loadRoutes(server, basePath, auth) {
        server.get(basePath + '/v1/users', auth.authenticatedInterceptor(basePath + '/login'), this.util.onlyAdmin, this.getUsers);
    }

    async getUsers(req, res) {
        try {
            let page = parseInt(req.query.page);
            let size = parseInt(req.query.size);
            let userId = parseInt(req.user.id);

            let users = await this.dal.getAllUsersPagedExcept(page, size, userId);
            if (users.length >= size - 1)// This is cause we are explicitly removing the current user.
                res.status(206).send(users);
            else
                res.status(200).send(users);
        }
        catch (err) {
            console.error(err);
            res.status(500).send([]);
        }
    }
}
module.exports = secureAPI;