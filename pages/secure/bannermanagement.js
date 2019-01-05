let adminPage = require('../../modules/adminPage')
let multer = require('multer')
let upload = multer();

class pageBannerManangement extends adminPage {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService, textService) {
        super(auth, dataAccessService, utilityService, constantsService, textService)


        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderBannerManagement = this.renderBannerManagement.bind(this);
        this.processBanners = this.processBanners.bind(this);
        this.runImageValidation = this.runImageValidation.bind(this);

        this.loadRoutes(server, basePath);
    }

    loadRoutes(server, basePath) {
        server.get(basePath + '/banner', this.safeRender(this.renderBannerManagement));
        var banners = upload.fields([{ name: 'banner1', maxCount: 1 }, { name: 'banner2', maxCount: 1 }, { name: 'banner3', maxCount: 1 }])
        server.post(basePath + '/banner', banners, this.safeRedirect(this.processBanners));
    }

    async renderBannerManagement(req, renderView) {
        let pageData = {};

        pageData[this.const.bannerUploadError] = req.flash(this.const.bannerUploadError);
        pageData[this.const.bannerUploadSuccess] = req.flash(this.const.bannerUploadSuccess);
        renderView('../pages/secure/bannermanagement', pageData);
    }

    async processBanners(req, renderRedirect) {

        if (req.files['banner1'] === undefined && req.files['banner2'] === undefined && req.files['banner3'] === undefined) {
            req.flash(this.const.bannerUploadError, "No banner images found to change.");
            renderRedirect("/secure/banner");
            return;
        }
        else {
            let banner1 = req.files["banner1"], banner2 = req.files["banner2"], banner3 = req.files["banner3"];
            if (banner1 !== undefined) {
                if (this.runImageValidation(banner1[0], "Banner 1", renderRedirect, req) === false) return;
            }
            if (banner2 !== undefined) {
                if (this.runImageValidation(banner2[0], "Banner 2", renderRedirect, req) === false) return;
            }
            if (banner3 !== undefined) {
                if (this.runImageValidation(banner3[0], "Banner 3", renderRedirect, req) === false) return;
            }

            await this.dal.saveBanners(banner1 !== undefined ? banner1[0].buffer : undefined, banner2 !== undefined ? banner2[0].buffer : undefined, banner3 !== undefined ? banner3[0].buffer : undefined);
            req.flash(this.const.bannerUploadSuccess, "Banner(s) uploaded sucessfully.");
            renderRedirect("/secure/banner");
            return;
        }
    }

    runImageValidation(file, name, renderRedirect, req) {
        if (this.util.validateIsInOptions(file.mimetype, ["image/jpeg"]) === false) {
            req.flash(this.const.bannerUploadError, "Unsupported image type for " + name);
            renderRedirect("/secure/banner");
            return false;
        }

        if (this.util.validateIsWholeNumberBetween(file.size, (100 * 1000), 1) == false) { //1-100KB
            req.flash(this.const.bannerUploadError, "Unsupported Product Image(" + name + ") size: " + file.size);
            renderRedirect("/secure/banner");
            return false;
        }
        return true;
    }
}
module.exports = pageBannerManangement;