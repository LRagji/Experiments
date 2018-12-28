let multer = require('multer')
let upload = multer();

class pageBannerManangement {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService) {
        this.dal = dataAccessService;
        this.util = utilityService;
        this.const = constantsService;

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderBannerManagement = this.renderBannerManagement.bind(this);
        this.processBanners = this.processBanners.bind(this);
        this.runImageValidation = this.runImageValidation.bind(this);

        this.loadRoutes(server, basePath, auth);
    }

    loadRoutes(server, basePath, auth) {
        server.get(basePath + '/banner', auth.authenticatedInterceptor(basePath + '/login'), this.util.onlyAdmin, this.renderBannerManagement);
        var banners = upload.fields([{ name: 'banner1', maxCount: 1 }, { name: 'banner2', maxCount: 1 }, { name: 'banner3', maxCount: 1 }])
        server.post(basePath + '/banner', auth.authenticatedInterceptor(basePath + '/login'), this.util.onlyAdmin, banners, this.processBanners);
    }

    renderBannerManagement(req, res) {
        try {
            let pageData = {};
            pageData[this.const.cartItems] = this.util.getCartItemsCount(req);
            pageData[this.const.bannerUploadError] = req.flash(this.const.bannerUploadError);
            pageData[this.const.bannerUploadSuccess] = req.flash(this.const.bannerUploadSuccess);
            res.render('../pages/secure/bannermanagement', this.util.constructPageData(req.user, pageData));
        }
        catch (err) {
            this.util.navigateToError(req, res, err);
        }
    }

    async processBanners(req, res) {
        try {
            if (req.files['banner1'] === undefined && req.files['banner2'] === undefined && req.files['banner3'] === undefined) {
                req.flash(this.const.bannerUploadError, "No banner images found to change.");
                res.redirect("/secure/banner");
                return;
            }
            else {
                let banner1 = req.files["banner1"], banner2 = req.files["banner2"], banner3 = req.files["banner3"];
                if (banner1 !== undefined) {
                    if (this.runImageValidation(banner1[0], "Banner 1", res, req) === false) return;
                }
                if (banner2 !== undefined) {
                    if (this.runImageValidation(banner2[0], "Banner 2", res, req) === false) return;
                }
                if (banner3 !== undefined) {
                    if (this.runImageValidation(banner3[0], "Banner 3", res, req) === false) return;
                }

                await this.dal.saveBanners(banner1 !== undefined ? banner1[0].buffer : undefined, banner2 !== undefined ? banner2[0].buffer : undefined, banner3 !== undefined ? banner3[0].buffer : undefined);
                req.flash(this.const.bannerUploadSuccess, "Banner(s) uploaded sucessfully.");
                res.redirect("/secure/banner");
                return;
            }
        }
        catch (err) {
            this.util.navigateToError(req, res, err);
        }
    }

    runImageValidation(file, name, res, req) {
        if (this.util.validateIsInOptions(file.mimetype, ["image/jpeg"]) === false) {
            req.flash(this.const.bannerUploadError, "Unsupported image type for " + name);
            res.redirect("/secure/banner");
            return false;
        }

        if (this.util.validateIsWholeNumberBetween(file.size, (100 * 1000), 1) == false) { //1-100KB
            req.flash(this.const.bannerUploadError, "Unsupported Product Image(" + name + ") size: " + file.size);
            res.redirect("/secure/banner");
            return false;
        }
        return true;
    }
}
module.exports = pageBannerManangement;