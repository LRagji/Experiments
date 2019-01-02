let page = require('../modules/page')

class pageError extends page {
    constructor(server, dataAccessService, utilityService, constantsService, textService) {

        super(dataAccessService, utilityService, constantsService, textService);

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderErrorPage = this.renderErrorPage.bind(this);

        this.loadRoutes(server);
    }

    loadRoutes(server) {
        server.get('/error', this.renderErrorPage);
    }

    async renderErrorPage(req, res) {
        let exception = req.flash(this.const.error);
        if (exception.length <= 0) {
            //This is the case when user directly request for a error page
            exception.push(new Error("Unknown Error"));
        }
        else {
            exception.forEach(err => {
                console.error('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                console.error(err);
                console.error('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
            });

        }
        let pageData = {};
        pageData[this.const.error] = exception;
        pageData[this.const.cartItems] = this.util.getCartItemsCount(req);
        res.render('../pages/error', await this.util.constructPageData(req.user, pageData, this.dal));
    }
}
module.exports=pageError