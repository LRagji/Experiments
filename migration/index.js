const sql = require('mssql')
var rp = require('request-promise-native');
let pg = require('pg')
let pgPool = new pg.Pool({ user: process.env.DB_USER || 'postgres', host: process.env.DB_HOST || 'localhost', database: process.env.DB_DB || 'Experimental', password: process.env.DB_PASS || 'P@55word', port: 5432, });
const products = require('../db/products').singleton(pgPool);

String.prototype.interpolate = function (params) {
    const names = Object.keys(params);
    const vals = Object.values(params);
    return new Function(...names, `return \`${this}\`;`)(...vals);
}

async function fetchRecords(query, iterator) {
    try {
        let results = []
        await sql.connect('mssql://hmlive:Health@123@103.50.162.128/oraneu1q_hmlive')
        const result = await sql.query(query);
        for (let ctr = 0; ctr < result.recordset; ctr++) {
            results.push(await iterator(result.recordset[ctr]));
        }
        return results;
    } catch (err) {
        console.error(err);
    }
};

async function featchImageFromSite(imageName) {
    try {
        if (valueObject.image_bg.endsWith('.jpg')) {
            filePath += valueObject.image;
            var options = {
                uri: 'https://www.health-mall.in/img_products/' + valueObject.image_bg,
                encoding: null
            };
            return await rp(options);
        }
        else {
            //transform to jpg and save
            console.log("Skipped " + imageName + " is not jpeg.")
        }
    }
    catch (err) {
        console.error(err);
    }
}

async function migrateProducts() {
    let query = "select top 1 * from product";
    await fetchRecords(query, (mssqlRecord) => {
        let imageBuff = await featchImageFromSite()
        if (imageBuff !== undefined) {
            products.createProduct(
                mssqlRecord.product_name,
                
                imageBuff);
        }
    });

}

migrateProducts();
