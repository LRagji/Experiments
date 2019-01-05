class page {
    constructor(dataAccessService, utilityService, constantsService, textService) {
        this.dal = dataAccessService;
        this.util = utilityService;
        this.const = constantsService;
        this.textService = textService;

        this.safeRender = this.safeRender.bind(this);
    }

     safeRender(renderCallback, view) {
        return async (req, res) => {
            try {
                let data = await renderCallback(req, res)
                if (data === undefined) data = {};
                data[this.const.cartItems] = this.util.getCartItemsCount(req);
                res.render(view, { user: req.user, pageData: data });
            }
            catch (err) {
                this.util.navigateToError(req, res, err);
            }
        };
    }
}

module.exports = page;