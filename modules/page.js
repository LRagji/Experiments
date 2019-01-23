class page {
    constructor(dataAccessService, utilityService, constantsService, textService) {
        this.dal = dataAccessService;
        this.util = utilityService;
        this.const = constantsService;
        this.textService = textService;

        this.loginPageUrl = "/secure/login";

        this.safeRender = this.safeRender.bind(this);
        this.safeRenderView = this.safeRenderView.bind(this);
    }

    safeRenderView(viewPath) {
        return this.safeRender((req, renderView) => renderView(viewPath));
    }

    safeRender(renderCallback) {
        return async (req, res) => {
            try {
                await renderCallback(req, (viewPath, data, cookie) => {
                    if (data === undefined) data = {};
                    data[this.const.cartItems] = this.util.getCartItemsCount(req);
                    if (cookie !== undefined) res.cookie(cookie.name, cookie.data, { maxAge: cookie.maxAgeInMilliSeconds, httpOnly: true, signed: true });
                    res.render(viewPath, { user: req.user, pageData: data });
                },
                    (pageUrl) => {
                        res.redirect(pageUrl);
                    })
            }
            catch (err) {
                this.util.navigateToError(req, res, err);
            }
        };
    }

    safeApi(apiCallback) {
        return async (req, res) => {
            try {
                await apiCallback(req, (statusCode, data) => {
                    res.status(statusCode).send(data);
                })
            }
            catch (err) {
                console.error('>>>>>>>>>>>>>>>>>API Error>>>>>>>>>>>>>>>>>>>>>');
                console.error(err);
                console.error('<<<<<<<<<<<<<<<<<API Error<<<<<<<<<<<<<<<<<<<<<');
                res.status(500).send(err);
            }
        };
    }
}

module.exports = page;