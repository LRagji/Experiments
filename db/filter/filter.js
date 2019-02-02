//TODO:I dont need this now so i am halting this but it can become an awesome npm package.
//Usecases 1)Pagination 2)Summary 3)Read calls
class filter {

    constructor(propertyMap, operatorMap) {
        this.propertyMap = propertyMap;
        this.operatorMap = operatorMap;
        this.constructWhereClause = this.constructWhereClause.bind(this);
    }

    constructWhereClause(filterObject, argumentArray) {
        let whereClause = ""
    }
}

module.exports = filter;