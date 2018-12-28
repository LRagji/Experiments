let multer = require('multer')
let upload = multer();

class pageProducts {
    constructor(server, basePath, auth, dataAccessService, utilityService, constantsService) {
        this.dal = dataAccessService;
        this.util = utilityService;
        this.const = constantsService;

        this.loadRoutes = this.loadRoutes.bind(this);
        this.renderProducts = this.renderProducts.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.respondWithRightPage = this.respondWithRightPage.bind(this);


        this.loadRoutes(server, basePath, auth);
    }

    loadRoutes(server, basePath, auth) {
        server.get(basePath + '/products', auth.authenticatedInterceptor(basePath + '/login'), this.util.onlyAdmin, this.renderProducts);
        server.post(basePath + '/products', auth.authenticatedInterceptor(basePath + '/login'), this.util.onlyAdmin, upload.single('image'), this.saveProduct);
    }

    async renderProducts(req, res) {
        try {

            let existingProduct = undefined;
            if (req.query.pid != undefined) {
                existingProduct = await this.dal.getProductById(req.query.pid);
                if (existingProduct === undefined) {
                    req.flash(this.const.newProductError, "No product exisits with Product ID:" + req.query.pid);
                }
            }

            let pageData = {};
            pageData[this.const.productinfo] = existingProduct === undefined ? req.flash(this.const.newProductState)[0] : existingProduct;
            pageData[this.const.newProductError] = req.flash(this.const.newProductError);
            pageData[this.const.newProductSuccess] = req.flash(this.const.newProductSuccess);
            pageData[this.const.cartItems] = this.util.getCartItemsCount(req);
            res.render('../pages/secure/products', this.util.constructPageData(req.user, pageData));

        }
        catch (err) {
            this.util.navigateToError(req, res, err);
        }

    }

    async saveProduct(req, res) {
        try {

            let productState = {
                "name": req.body.name,
                "offerprice": req.body.offerPrice,
                "price": req.body.price,
                "image": undefined,
                "description": req.body.desc,
                "ingredients": req.body.ingredients,
                meta: {
                    "code": req.body.code,
                    "package_detail": req.body.packageDetail,
                    "serving_size": req.body.servingSize,
                    "serving_per_container": req.body.servingPerContainer,
                    "shippingdetail": req.body.shippingDetails,
                    "category": req.body.cat,
                    "subCategory": req.body.subCat,
                    "mname": req.body.mName,
                    "mwebsite": req.body.mWebsite
                }
            }

            let IsNewProduct = req.body.id === "";

            if (req.body.delete === "on") {
                if (IsNewProduct) {
                    req.flash(this.const.newProductError, "Invalid request product cannot be deleted.");
                    res.redirect("/secure/products?tab=new");
                }
                else {
                    await this.dal.deleteProduct(req.body.id);
                    req.flash(this.const.newProductSuccess, "Product deleted successfully");
                    res.redirect("/secure/products?tab=new");
                }
                return;
            }

            if (!IsNewProduct && this.util.validateIsWholeNumberBetween(req.body.id, 50000, 0) === false) {
                throw new Error("Invalid System Product ID:" + req.body.id);
            }

            if (this.util.validateLength(req.body.name, 50, 1) === false) {
                req.flash(this.const.newProductError, "Invalid product name length [50,1].");
                this.respondWithRightPage(req, IsNewProduct, productState, res);
                return;
            }

            if (this.util.validateIsFloatNumberBetween(req.body.price, 100000, 0) === false) {
                req.flash(this.const.newProductError, "Invalid product price, should be between 0 to 100000.");
                this.respondWithRightPage(req, IsNewProduct, productState, res);
                return;
            }

            if (this.util.validateIsFloatNumberBetween(req.body.offerPrice, 100000, 0) === false) {
                req.flash(this.const.newProductError, "Invalid product offer price, should be between 0 to 100000.");
                this.respondWithRightPage(req, IsNewProduct, productState, res);
                return;
            }

            if (this.util.validateIsFloatNumberBetween(req.body.offerPrice, req.body.price, 0) === false) {
                req.flash(this.const.newProductError, "Invalid offer price, should be less than product price.");
                this.respondWithRightPage(req, IsNewProduct, productState, res);
                return;
            }

            if (this.util.validateLength(req.body.desc, 2000, 0) === false) {
                req.flash(this.const.newProductError, "Invalid product description length [2000,0].");
                this.respondWithRightPage(req, IsNewProduct, productState, res);
                return;
            }

            if (this.util.validateLength(req.body.ingredients, 2000, 0) === false) {
                req.flash(this.const.newProductError, "Invalid product ingredients length [2000,0].");
                this.respondWithRightPage(req, IsNewProduct, productState, res);
                return;
            }

            if (this.util.validateIsWholeNumberBetween(req.body.shippingDetails, 999, 1) === false) {
                req.flash(this.const.newProductError, "Invalid shipping detail, should be a whole number between 1 to 999 days.");
                this.respondWithRightPage(req, IsNewProduct, productState, res);
                return;
            }

            if (this.util.validateLength(req.body.code, 20, 1) === false) {
                req.flash(this.const.newProductError, "Invalid product code length [20,1].");
                this.respondWithRightPage(req, IsNewProduct, productState, res);
                return;
            }

            if (this.util.validateLength(req.body.packageDetail, 20, 1) === false) {
                req.flash(this.const.newProductError, "Invalid package details length [20,1].");
                this.respondWithRightPage(req, IsNewProduct, productState, res);
                return;
            }

            if (this.util.validateLength(req.body.servingSize, 20, 1) === false) {
                req.flash(this.const.newProductError, "Invalid serving size length [20,1].");
                this.respondWithRightPage(req, IsNewProduct, productState, res);
                return;
            }

            if (this.util.validateLength(req.body.servingPerContainer, 100, 1) === false) {
                req.flash(this.const.newProductError, "Invalid serving per container length [100,1].");
                this.respondWithRightPage(req, IsNewProduct, productState, res);
                return;
            }

            if (this.util.validateLength(req.body.mName, 20, 1) === false) {
                req.flash(this.const.newProductError, "Invalid manufacturer name length [20,1].");
                this.respondWithRightPage(req, IsNewProduct, productState, res);
                return;
            }

            if (this.util.validateLength(req.body.mWebsite, 100, 1) === false) {
                req.flash(this.const.newProductError, "Invalid manufacturer website length [100,1].");
                this.respondWithRightPage(req, IsNewProduct, productState, res);
                return;
            }

            if (this.util.validateIsUrl(req.body.mWebsite) === false) {
                req.flash(this.const.newProductError, "Invalid manufacturer website.");
                this.respondWithRightPage(req, IsNewProduct, productState, res);
                return;
            }

            if (this.util.validateLength(req.body.cat, 20, 1) === false) {
                req.flash(this.const.newProductError, "Invalid category length [20,1].");
                this.respondWithRightPage(req, IsNewProduct, productState, res);
                return;
            }

            if (this.util.validateLength(req.body.subCat, 20, 1) === false) {
                req.flash(this.const.newProductError, "Invalid sub category length [20,1].");
                this.respondWithRightPage(req, IsNewProduct, productState, res);
                return;
            }

            if (this.util.validateLength(req.body.imageName, 50, 1) === false) {
                req.flash(this.const.newProductError, "Form has been tampared with for image name.");
                this.respondWithRightPage(req, IsNewProduct, productState, res);
                return;
            }

            if (req.body.useDefaultImage === undefined) {
                if (req.file === undefined) {
                    req.flash(this.const.newProductError, "Missing Product Image.");
                    this.respondWithRightPage(req, IsNewProduct, productState, res);
                    return;
                }

                if (this.util.validateIsInOptions(req.file.mimetype, ["image/jpeg"]) === false) {
                    req.flash(this.const.newProductError, "Invalid/Unsupported Product Image type (only:jpg,jpeg,jpe).");
                    this.respondWithRightPage(req, IsNewProduct, productState, res);
                    return;
                }

                if (this.util.validateIsWholeNumberBetween(req.file.size, (100 * 1000), 1) == false) { //1-100KB
                    req.flash(this.const.newProductError, "Unsupported Product Image size: " + req.file.size);
                    this.respondWithRightPage(req, IsNewProduct, productState, res);
                    return;
                }
                req.body.imageName = "P" + Date.now().toString() + ".jpg";
            }
            else {
                if (IsNewProduct === true) req.body.imageName = "default.jpg"
            }

            let freshProduct = undefined;
            if (IsNewProduct) {
                //Create new Product
                freshProduct = await this.dal.saveProduct(
                    req.body.name,
                    req.body.price,
                    req.body.offerPrice,
                    req.body.imageName,
                    req.body.desc,
                    req.body.ingredients,
                    {
                        "code": req.body.code,
                        "package_detail": req.body.packageDetail,
                        "serving_size": req.body.servingSize,
                        "serving_per_container": req.body.servingPerContainer,
                        "shippingdetail": req.body.shippingDetails,
                        "category": req.body.cat,
                        "subCategory": req.body.subCat,
                        "mname": req.body.mName,
                        "mwebsite": req.body.mWebsite
                    },
                    req.file !== undefined ? req.file.buffer : undefined
                );
            }
            else {
                //Update exisitng Product
                freshProduct = await this.dal.updateProduct(
                    req.body.id,
                    req.body.name,
                    req.body.price,
                    req.body.offerPrice,
                    req.body.imageName,
                    req.body.desc,
                    req.body.ingredients,
                    {
                        "code": req.body.code,
                        "package_detail": req.body.packageDetail,
                        "serving_size": req.body.servingSize,
                        "serving_per_container": req.body.servingPerContainer,
                        "shippingdetail": req.body.shippingDetails,
                        "category": req.body.cat,
                        "subCategory": req.body.subCat,
                        "mname": req.body.mName,
                        "mwebsite": req.body.mWebsite
                    },
                    req.file !== undefined ? req.file.buffer : undefined
                );
            }
            req.flash(this.const.newProductSuccess, "Product " + freshProduct.name + " saved sucessfully with product id:" + freshProduct.id);
            res.redirect("/secure/products?tab=new" + (IsNewProduct ? "" : ("&pid=" + req.body.id)));
        }
        catch (err) {
            this.util.navigateToError(req, res, err);
        }
    }

    respondWithRightPage(req, IsNewProduct, productState, res) {
        if (IsNewProduct) {
            req.flash(this.const.newProductState, productState);
            res.redirect("/secure/products?tab=new");
        }
        else {
            res.redirect("/secure/products?tab=new&pid=" + req.body.id);
        }
    }

}

module.exports = pageProducts;