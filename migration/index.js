const sql = require('mssql')
var rp = require('request-promise-native');
const fs = require('fs');
let pg = require('pg')
let pgPool = new pg.Pool({ user: process.env.DB_USER || 'postgres', host: process.env.DB_HOST || 'localhost', database: process.env.DB_DB || 'Experimental', password: process.env.DB_PASS || 'P@55word', port: 5432, });

String.prototype.interpolate = function (params) {
    const names = Object.keys(params);
    const vals = Object.values(params);
    return new Function(...names, `return \`${this}\`;`)(...vals);
}

async function fetchRecords(query, iterator) {
    try {
        let results = []
        await sql.connect('')
        const result = await sql.query(query);
        for (let ctr = 0; ctr < result.recordset; ctr++) {
            results.push(await iterator(result.recordset[ctr]));
        }
        return results;
    } catch (err) {
        console.error(err);
    }
};

async function insertIntoPg(queryTemplate, valueObject, next) {
    try {
        let result = await pgPool.query(queryTemplate.interpolate(valueObject));
        return await next(result);
    }
    catch (err) {
        console.error(err);
    }
}

async function saveImageOnFileSystem(valueObject, filePath) {
    try {
        if (valueObject.image_bg.endsWith('.jpg')) {
            filePath += valueObject.image;
            var options = {
                uri: 'https://www.health-mall.in/img_products/' + valueObject.image_bg,
                encoding: null
            };
            let image = await rp(options);
            fs.writeFileSync(filePath, image);
            return;
        }
        else {
            //transform to jpg and save
        }
    }
    catch (err) {
        console.error(err);
    }
}

async function migrateProducts() {
    let query = "select top 1 * from product";
    let insertQuery = `Insert into products name,productPrice,offerPrice,image,desc,ingredients,meta,faq,searchKeywords values()`;
    //await saveImageOnFileSystem({ image_bg: "3993_bg.jpg", image: 'test.jpg' }, 'static/resources/images/products/');
    
}

migrateProducts();
