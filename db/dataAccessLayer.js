let pg = require('pg')
let pgPool = new pg.Pool({ user: 'postgres', host: 'localhost', database: 'Experimental', password: 'P@55word', port: 5432, });
class DAL {
    constructor() {
        this.getProductById = this.getProductById.bind(this);
        this.pool = this.pool.bind(this);

//         let insertQuery = "insert into products (mid,name,price, discount,image,description,ingredients,keywords,meta,sys_meta)  values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);"
//         for (let i = 0; i < 50000; i++) {
//             pgPool.query(insertQuery, [1, 'ProductName' + i,
//                 (i * 1000), i,
//                 '{"./static/resources/images/Product1.jpg","./static/resources/images/Product2.jpg","./static/resources/images/Product3.jpg","./static/resources/images/Product4.jpg"}',
//                 '<ul><li>Protection from heart attack and stroke.</li><li>Lowers triglycerides, LDL and increases HDL.</li><li>Helps maintain healthy joints.</li><li>Key component of the brain and eye.</li><li>Important in the growth and development of the foetal brain during pregnancy.</li><li>Improves skin and eye health.</li><li>Helps in psoriasis and eczema.</li><li>Provide lubrication to the skin, arteries, veins and intestinal tract.</li><li>Helps in reducing depression.</li><li>Helps in Attention Deficit/Hyperactivity Disorder (ADHD)</li><li>Helps maintain normal blood sugar levels.</li><li>Lowers blood pressure.</li><li>Helps in Reducing breast, colon and prostate cancer.</li></ul>',
//                 '<table border="1" cellpadding="0" cellspacing="0" style="width:84.36%;" width="84%"><tbody><tr><td colspan="3" style="width:100.0%;"><p><strong>Supplement Facts:</strong></p></td></tr><tr><td colspan="3" style="width:100.0%;"><p><strong>Serving Size:</strong>&nbsp;1 Capsule</p></td></tr><tr><td>&nbsp;</td><td style="width:21.72%;"><p align="center"><strong>Amount Per Serving</strong></p></td><td style="width:20.22%;"><p align="center"><strong>% DV</strong></p></td></tr><tr><td><p>MegaNatural-BP<br>Grape Seed Extract<br>Vitus Vinifera Seed Standardized to 90% Polyphenols</p></td><td style="width:21.72%;"><p align="center">300 mg</p></td><td style="width:20.22%;"><p align="center">*</p></td></tr><tr><td colspan="3" style="width:100.0%;"><p>*Daily Value (DV) not established.</p></td></tr></tbody></table>',
//                 '{"Search","Me","Product","Hello","World","Productç' + i + '"}',
//                 `{
//     "Category":"Diet",
// "Sub-Category":"Unknown",
// "code":"HO7914",
// "package_detail":"60veggie capsules",
// "serving_per_container":"This bottle will last 60 days",
// "serving_size":"1 capsule",
// "max_quantity":10,
// "shipping_time":"Ships in 3 days"
// }`,
//                 `{
//     "position":20,
//     "sale":false,
//     "isNew":false,
//     "isTop":false,
//     "isActive":true,
//     "amazon":false,
//     "is_amazon_blocked":false,
//     "is_liquid":true
// }`
//             ]).catch((err) => console.error(err))

//         };
    }

    pool() {
        return pgPool;
    }

    getProductById(productId) {
        return pgPool.query(`SELECT manufacturer.name as mname,manufacturer.website as website,manufacturer.image as mimage,products.*
        FROM products JOIN manufacturer ON (products.mid = manufacturer.id) 
        where products.id=$1`, [productId])
            .then((res) => { return res.rows[0] });
    }
}

module.exports = DAL;