class page {
    constructor(dataAccessService, utilityService, constantsService, textService) {
        this.dal = dataAccessService;
        this.util = utilityService;
        this.const = constantsService;
        this.textService = textService;

        this.safeRender = this.safeRender.bind(this);
        this.safeRedirect = this.safeRedirect.bind(this);
        this.safeResponse = this.safeResponse.bind(this);
        this.safeRenderView=this.safeRenderView.bind(this);
    }

    safeRenderView(viewPath) {
        return this.safeRender((req, renderView) => renderView(viewPath));
    }

    safeRender(renderCallback) {
        return async (req, res) => {
            try {
                await renderCallback(req, (viewPath, data) => {
                    if (data === undefined) data = {};
                    data[this.const.cartItems] = this.util.getCartItemsCount(req);
                    res.render(viewPath, { user: req.user, pageData: data });
                })
            }
            catch (err) {
                this.util.navigateToError(req, res, err);
            }
        };
    }

    safeRedirect(renderCallback) {
        return async (req, res) => {
            try {
                await renderCallback(req, (pageUrl) => {
                    res.redirect(pageUrl);
                })
            }
            catch (err) {
                this.util.navigateToError(req, res, err);
            }
        };
    }

    safeResponse(renderCallback) {
        return async (req, res) => {
            try {
                await renderCallback(req, res)
            }
            catch (err) {
                this.util.navigateToError(req, res, err);
            }
        };
    }
}

module.exports = page;