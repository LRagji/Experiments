let pg = require('pg')
let pgPool = new pg.Pool({ user: process.env.DB_USER || 'postgres', host: process.env.DB_HOST || 'localhost', database: process.env.DB_DB || 'Experimental', password: process.env.DB_PASS || 'P@55word', port: 5432, });
const products = require('../db/products').singleton(pgPool);
const categories = require('../db/categories').singleton(pgPool);
const videos = require('../db/healthvideos').singleton(pgPool);
const subCategories = require('../db/subcategories').singleton(pgPool);
const brands = require('../db/brands').singleton(pgPool);
const healthLinks = require('../db/healthlinks').singleton(pgPool);

async function InsertMockProducts(numberOfProducts) {
    for (let i = 0; i < numberOfProducts; i++) {
        process.stdout.write("\rCreating product #" + i);
        await products.createProduct(
            "Doctor's Best, Best Vitamin C, 1000 mg, 120 Veg " + i,
            (parseFloat(i) * 100.00 + 1000.00),
            (parseFloat(i) * 100.00),
            "default.jpg",
            '<ul><li>Protection from heart attack and stroke.</li><li>Lowers triglycerides, LDL and increases HDL.</li><li>Helps maintain healthy joints.</li><li>Key component of the brain and eye.</li><li>Important in the growth and development of the foetal brain during pregnancy.</li><li>Improves skin and eye health.</li><li>Helps in psoriasis and eczema.</li><li>Provide lubrication to the skin, arteries, veins and intestinal tract.</li><li>Helps in reducing depression.</li><li>Helps in Attention Deficit/Hyperactivity Disorder (ADHD)</li><li>Helps maintain normal blood sugar levels.</li><li>Lowers blood pressure.</li><li>Helps in Reducing breast, colon and prostate cancer.</li></ul>',
            '<table border="1" cellpadding="0" cellspacing="0" style="width:84.36%;" width="84%"><tbody><tr><td colspan="3" style="width:100.0%;"><p><strong>Supplement Facts:</strong></p></td></tr><tr><td colspan="3" style="width:100.0%;"><p><strong>Serving Size:</strong>&nbsp;1 Capsule</p></td></tr><tr><td>&nbsp;</td><td style="width:21.72%;"><p align="center"><strong>Amount Per Serving</strong></p></td><td style="width:20.22%;"><p align="center"><strong>% DV</strong></p></td></tr><tr><td><p>MegaNatural-BP<br>Grape Seed Extract<br>Vitus Vinifera Seed Standardized to 90% Polyphenols</p></td><td style="width:21.72%;"><p align="center">300 mg</p></td><td style="width:20.22%;"><p align="center">*</p></td></tr><tr><td colspan="3" style="width:100.0%;"><p>*Daily Value (DV) not established.</p></td></tr></tbody></table>',
            "C" + i.toString(),
            "180 Softgels",
            "1 Softgels",
            "This bottle will last 180 days.",
            i + 1,
            [],
            "search Laukik Ragji Hello " + i,
            undefined,
            true,
            true,
            [],
            [0],
            0,
            [1],
            [1]
        );
    }
    process.stdout.write("\r\n");
}

async function InsertCategories(numberOfCategories) {
    for (let i = 0; i < numberOfCategories; i++) {
        await categories.createCategory("Category " + i);
    }
}

async function InsertVideos(numberOfCategories) {
    for (let i = 0; i < numberOfCategories; i++) {
        await videos.createHealthVideo("Health Video" + i, "Video Text", '<iframe width="560" height="315" src="https://www.youtube.com/embed/nm1lYAvx2mw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', [], []);
    }
}

async function InsertIngredients(number) {
    for (let i = 0; i < number; i++) {
        await videos._ingredientsEntity.createEntity({ name: "Ingredient" + i })
    }
}

async function InsertHealthConditions(number) {
    for (let i = 0; i < number; i++) {
        await videos._healthConditionsEnity.createEntity({ name: "Health condition" + i });
    }
}

async function InsertSubCategories(number) {
    let cat = await categories.readAllCategories();
    for (let i = 0; i < number; i++) {
        await subCategories.createSubCategory(cat[0].id, "SubCate\"gory " + i);
    }
}

async function InsertBrands(number) {
    for (let i = 0; i < number; i++) {
        await brands.createBrand("Manufacturer" + i, "https://www.facebook.com/");
    }
}

async function InsertHealthLinks(number) {
    for (let i = 0; i < number; i++) {
        await healthLinks.createHealthLink("Link " + i, "Random html text for link " + i);
    }
}

async function main() {
    console.log("Execution Started");
    for (let ctr = 0; ctr < process.argv.length; ctr++) {
        let kvp = process.argv[ctr].toLowerCase();

        if (kvp.startsWith("products:")) {
            let value = kvp.replace("products:", "");
            if (!isNaN(value)) {
                console.log("Inserting " + value + " products.")
                InsertMockProducts(parseInt(value));
            }
        }

        if (kvp.startsWith("categories:")) {
            let value = kvp.replace("categories:", "");
            if (!isNaN(value)) {
                console.log("Inserting " + value + " categories.")
                InsertCategories(parseInt(value));
            }
        }

        if (kvp.startsWith("videos:")) {
            let value = kvp.replace("videos:", "");
            if (!isNaN(value)) {
                console.log("Inserting " + value + " videos.")
                InsertVideos(parseInt(value));
            }
        }

        if (kvp.startsWith("ingredients:")) {
            let value = kvp.replace("ingredients:", "");
            if (!isNaN(value)) {
                console.log("Inserting " + value + " ingredients.")
                InsertIngredients(parseInt(value));
            }
        }

        if (kvp.startsWith("healthconditions:")) {
            let value = kvp.replace("healthconditions:", "");
            if (!isNaN(value)) {
                console.log("Inserting " + value + " healthConditions.")
                InsertHealthConditions(parseInt(value));
            }
        }

        if (kvp.startsWith("subcategories:")) {
            let value = kvp.replace("subcategories:", "");
            if (!isNaN(value)) {
                console.log("Inserting " + value + " subCategories.")
                InsertSubCategories(parseInt(value));
            }
        }

        if (kvp.startsWith("brands:")) {
            let value = kvp.replace("brands:", "");
            if (!isNaN(value)) {
                console.log("Inserting " + value + " brands.")
                InsertBrands(parseInt(value));
            }
        }

        if (kvp.startsWith("healthlinks:")) {
            let value = kvp.replace("healthlinks:", "");
            if (!isNaN(value)) {
                console.log("Inserting " + value + " healthlinks.")
                await InsertHealthLinks(parseInt(value));
            }
        }
    };
    console.log("Execution Completed");
}

main();