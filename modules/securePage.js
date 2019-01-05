let page = require('./page');

class securePage extends page {
    constructor(auth, dataAccessService, utilityService, constantsService, textService) {
        super(dataAccessService, utilityService, constantsService, textService)

        this.auth = auth;
        this.loginPageUrl = "/secure/login";

        this.safeRender = this.safeRender.bind(this);
        this.safeRedirect = this.safeRedirect.bind(this);
        this.safeResponse = this.safeResponse.bind(this);
        this.safeRenderView = this.safeRenderView.bind(this);
    }

    safeRenderView(viewPath) {
        return this.safeRender((req, renderView) => renderView(viewPath));
    }

    safeRender(renderCallback) {
        return [this.auth.authenticatedInterceptor(this.loginPageUrl), super.safeRender(renderCallback)]
    }

    safeRedirect(renderCallback) {
        return [this.auth.authenticatedInterceptor(this.loginPageUrl), super.safeRedirect(renderCallback)]
    }

    safeResponse(renderCallback) {
        return [this.auth.authenticatedInterceptor(this.loginPageUrl), super.safeResponse(renderCallback)]
    }
}

module.exports = securePage