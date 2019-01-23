let page = require('./page');

class securePage extends page {
    constructor(auth, dataAccessService, utilityService, constantsService, textService) {
        super(dataAccessService, utilityService, constantsService, textService)

        this.auth = auth;
       
        this.safeRender = this.safeRender.bind(this);
        this.safeRenderView = this.safeRenderView.bind(this);
    }

    safeRenderView(viewPath) {
        return this.safeRender((req, renderView) => renderView(viewPath));
    }

    safeRender(renderCallback) {
        return [this.auth.authenticatedInterceptor(this.loginPageUrl), super.safeRender(renderCallback)]
    }

    safeApi(apiCallback) {
          //TODO:Should we navigate to login page or throw 403 status?
        return [this.auth.authenticatedInterceptor(this.loginPageUrl), super.safeApi(apiCallback)]
    }
}

module.exports = securePage