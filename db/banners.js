let fs = require('fs');

class banners {
    constructor() {
        this.saveBanners = this.saveBanners.bind(this);
    }

    static singleton() {
        if (this.instance === undefined) {
            this.instance = new banners();
        }
        return this.instance;
    }

    saveBanners(banner1Buff, banner2Buff, banner3Buff) {
        return new Promise((acc, rej) => {
            try {
                if (banner1Buff !== undefined) {
                    fs.writeFileSync('static/resources/images/banners/banner1.jpg', banner1Buff);
                }
                if (banner2Buff !== undefined) {
                    fs.writeFileSync('static/resources/images/banners/banner2.jpg', banner2Buff);
                }
                if (banner3Buff !== undefined) {
                    fs.writeFileSync('static/resources/images/banners/banner3.jpg', banner3Buff);
                }
                acc();
            }
            catch (err) {
                rej(err);
            }
        });
    }
}
module.exports = banners;