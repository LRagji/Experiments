let pg = require('pg')
let pgPool = new pg.Pool({ user: process.env.DB_USER || 'postgres', host: process.env.DB_HOST || 'localhost', database: process.env.DB_DB || 'Experimental', password: process.env.DB_PASS || 'P@55word', port: 5432, });
let settings = require('./appsettings');
let orders = require('./orders').singleton(pgPool);
let banners = require('./banners').singleton();
let products = undefined;
let healthTopics = require('./healthtopics').singleton(pgPool);
let healthLinks = require('./healthlinks').singleton(pgPool);
let brands = require('./brands').singleton(pgPool);
let categories = require('./categories').singleton(pgPool);
let subCategories = require('./subcategories').singleton(pgPool);
let healthVideos = require('./healthvideos').singleton(pgPool);
let wishlist = require('./wishlist').singleton(pgPool);
let faqs = require('./faqs').singleton(pgPool);
let users = require('./users').singleton(pgPool);

// TODO:Call the appropiate API
class DAL {
    constructor(constantService) {

        this.const = constantService;
        products = require('./products').singleton(pgPool, this); //TODO kill this line it should be required in the top with only pgpool param.

        this.appSettings = settings.singleton(constantService, pgPool);
        this.orders = orders;
        this.products = products;
        this.banners = banners;
        this.healthTopics = healthTopics;
        this.healthLinks = healthLinks;
        this.brands = brands;
        this.categories = categories;
        this.subCategories = subCategories;
        this.healthVideos = healthVideos;
        this.wishlist = wishlist;
        this.faqs = faqs;
        this.users = users;

        this.pool = this.pool.bind(this);
      

        //TODO:Delete this mock data

        // if (users.length === 0) {
        //     for (let i = 0; i < 50; i++) //7389 Total users
        //         users.push(
        //             {
        //                 id: i,
        //                 salutation: "Mr",
        //                 first: i === 0 ? "Admin" : "Laukik",
        //                 last: i,
        //                 mobile: "123456789",
        //                 email: i === 0 ? "admin@gmail.com" : i + "@gmail.com",
        //                 password: "bc1f2f74f887ea16acee259f8c380ae8",
        //                 meta: {
        //                     "status": "active",
        //                     "type": i === 0 ? "admin" : "normal"
        //                 }
        //             }
        //         );
        // }
    }

    pool() {
        return pgPool;
    }
}

module.exports = DAL;