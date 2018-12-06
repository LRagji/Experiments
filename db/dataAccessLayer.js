let pg = require('pg')
let pgPool = new pg.Pool({ user: 'postgres', host: 'localhost', database: 'Experimental', password: 'P@55word', port: 5432, });
class DAL {
    constructor() {
        this.getProductById = this.getProductById.bind(this);
        this.pool = this.pool.bind(this);
        
        //let insertQuery = "insert into products (name,price, discount,image,description,keywords,meta) values($1,$2,$3,$4,$5,$6,$7);"
        // for(i-0;i<100;i++)
        // {
        //  pgPool.query(insertQuery, ['ProductName' + i, (i * 1000), i, '{"./static/resources/images/Product' + i + '.jpg","./static/resources/images/Product_sm' + i + '.jpg"}', 'Yet to find', '{"Product' + i + '","anything"}', '{"key":"value"}'])
        // };
    }

    pool() {
        return pgPool;
    }

    getProductById(productId) {
        return pgPool.query("select * from products where id=$1",[productId])
        .then((res)=>{return res.rows[0]});
    }
}

module.exports = DAL;