let list = [];

class wishlist {

    constructor() {

        this.createWishlist = this.createWishlist.bind(this);
        this.readAllWishlist = this.readAllWishlist.bind(this);
        this.deleteWishlist = this.deleteWishlist.bind(this);
    }

    static singleton() {
        if (this.instance === undefined) {
            this.instance = new wishlist();
        }
        return this.instance;
    }

    createWishlist(productId) {
        return new Promise((acc, rej) => {
            try {
                productId = parseInt(productId);
                let idx = list.indexOf(productId);
                if (idx < 0) {
                    list.push(idx);
                }
                acc(list.length);
            }
            catch (ex) {
                rej(ex);
            }
        });
    }

    readAllWishlist() {
        return new Promise((acc, rej) => {
            try {
                acc(list.map((e) => Object.assign({}, e)));
            }
            catch (ex) {
                rej(ex);
            }
        });
    }

    deleteWishlist(productId) {
        return new Promise((acc, rej) => {
            try {
                productId = parseInt(productId);
                let idx = list.indexOf(productId);
                if (idx > 0) {
                    list.splice(idx, 1);
                }
                acc();
            }
            catch (ex) {
                rej(ex);
            }
        });
    }

}

module.exports = wishlist;