let page = require('./securePage');

class adminOnlyPage extends page {
    constructor(auth, dataAccessService, utilityService, constantsService, textService) {
        super(auth, dataAccessService, utilityService, constantsService, textService)

        this.safeRender = this.safeRender.bind(this);
        this.safeRedirect = this.safeRedirect.bind(this);
        this.safeResponse = this.safeResponse.bind(this);
        this.safeRenderView = this.safeRenderView.bind(this);
        this.onlyAdmin = this.onlyAdmin.bind(this);
    }

    safeRenderView(viewPath) {
        return this.safeRender((req, renderView) => renderView(viewPath));
    }

    safeRender(renderCallback, middleWare) {
        let middleWares = super.safeRender(renderCallback);
        middleWares.splice(1, 0, this.onlyAdmin);
        if (middleWare !== undefined) middleWares.splice(2, 0, middleWare);
        return middleWares;
    }

    safeRedirect(renderCallback, middleWare) {
        let middleWares = super.safeRedirect(renderCallback);
        middleWares.splice(1, 0, this.onlyAdmin);
        if (middleWare !== undefined) middleWares.splice(2, 0, middleWare);
        return middleWares;
    }

    safeResponse(renderCallback, middleWare) {
        let middleWares = super.safeResponse(renderCallback);
        middleWares.splice(1, 0, this.onlyAdmin);
        if (middleWare !== undefined) middleWares.splice(2, 0, middleWare);
        return middleWares;
    }

    onlyAdmin(req, res, next) {
        if (this.util.isAdmin(req.user) === false) {
            console.warn("Security Alert: User(" + req.user.id + ") tried to access non privileged " + req.originalUrl + " resource.");
            res.redirect("/secure/profile");
            return;
        }
        else {
            next();
        }
    }
}

module.exports = adminOnlyPage