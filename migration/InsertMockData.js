let pg = require('pg')
let pgPool = new pg.Pool({ user: process.env.DB_USER || 'postgres', host: process.env.DB_HOST || 'localhost', database: process.env.DB_DB || 'Experimental', password: process.env.DB_PASS || 'P@55word', port: 5432, });
const products = require('../db/products').singleton(pgPool);
const categories = require('../db/categories').singleton(pgPool);
const videos = require('../db/healthvideos').singleton(pgPool);
const subCategories = require('../db/subcategories').singleton(pgPool);
const brands = require('../db/brands').singleton(pgPool);
const healthLinks = require('../db/healthlinks').singleton(pgPool);
const healthTopics = require('../db/healthtopics').singleton(pgPool);
const orders = require('../db/orders').singleton(pgPool);
const faqs = require('../db/faqs').singleton(pgPool);
const users = require('../db/users').singleton(pgPool);
const feedback = require('../db/feedback').singleton(pgPool);

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
            [1],
            1,
            [1],
            [1]
        );
    }
    process.stdout.write("\r\n");
}

async function InsertCategories(numberOfCategories) {
    for (let i = 0; i < numberOfCategories; i++) {
        await categories.createCategory("Category " + i, 0);
    }
}

async function InsertFeedback(numberOfComments) {
    for (let i = 0; i < numberOfComments; i++) {
        await feedback.createFeedback(0, i, 5, "Comment number: " + i);
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

async function InsertHealthTopics(number) {
    for (let i = 0; i < number; i++) {
        await healthTopics.createHealthTopic("Topic " + i);
    }
}

async function InsertFaqs(number) {
    for (let i = 0; i < number; i++) {
        await faqs.createFAQ("Who am i ?" + i, "I am your friendly neighbourhood spider man." + i);
    }
}

async function InsertUsers(number) {
    for (let i = 0; i < number; i++) {
        await users.createUser("Mr", "Admin" + (i === 0 ? "" : i), "Last Name" + i, "981956962" + i, "admin" + (i === 0 ? "" : i) + "@gmail.com", "admin", (i === 0 ? "admin" : ""));
    }
}
async function InsertOrders(number) {
    for (let i = 0; i < number; i++) {
        await orders.createOrder({
            "userId": 0,
            "date": 1545477745147,
            "status": "Awaiting Payment",
            "tax": 20,
            "products": [
                { "productId": 14, "quantity": 1, "offerprice": 100 / i },
                { "productId": 13, "quantity": 1, "offerprice": 10 * i },
                { "productId": i, "quantity": 1, "offerprice": 10 / i },
                { "productId": 12, "quantity": 1, "offerprice": 100 * i }
            ],
            "shippingDetails": {
                "billing": {
                    "bSalutation": "Mr.",
                    "bFirstName": "Laukik",
                    "bLastName": "Ragji",
                    "bAdd1": "Add1",
                    "bAdd2": "Add2",
                    "bAdd3": "Add3",
                    "bCity": "Mumbai",
                    "bPincode": "400093",
                    "bState": "Jammu & Kashmir",
                    "bMobile": "9819569622",
                    "bGstin": "123456789012345"
                },
                "shipping": {
                    "sSalutation": "Mr.",
                    "sFirstName": "Laukik",
                    "sLastName": "Ragji",
                    "sAdd1": "Add1",
                    "sAdd2": "Add2",
                    "sAdd3": "Add3",
                    "sCity": "Mumbai",
                    "sPincode": "400093",
                    "sState": "Jammu & Kashmir",
                    "sMobile": "9819569622",
                    "sGstin": "123456789012345"
                }
            },
            "payment": {
                "type": "cheque",
                "no": "335562",
                "date": "2018-12-22",
                "bank name": "Hello Bank",
                "bank branch": "Some Branch",
                "deposited bank": "Canara",
                "amount": "5000"
            }
        });
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

        if (kvp.startsWith("healthtopics:")) {
            let value = kvp.replace("healthtopics:", "");
            if (!isNaN(value)) {
                console.log("Inserting " + value + " healthtopics.")
                await InsertHealthTopics(parseInt(value));
            }
        }

        if (kvp.startsWith("orders:")) {
            let value = kvp.replace("orders:", "");
            if (!isNaN(value)) {
                console.log("Inserting " + value + " orders.")
                await InsertOrders(parseInt(value));
            }
        }

        if (kvp.startsWith("faqs:")) {
            let value = kvp.replace("faqs:", "");
            if (!isNaN(value)) {
                console.log("Inserting " + value + " faqs.")
                await InsertFaqs(parseInt(value));
            }
        }

        if (kvp.startsWith("users:")) {
            let value = kvp.replace("users:", "");
            if (!isNaN(value)) {
                console.log("Inserting " + value + " users.")
                await InsertUsers(parseInt(value));
            }
        }

        if (kvp.startsWith("feedback:")) {
            let value = kvp.replace("feedback:", "");
            if (!isNaN(value)) {
                console.log("Inserting " + value + " feedback comments.")
                await InsertFeedback(parseInt(value));
            }
        }
    };
    console.log("Execution Completed");
}

main();