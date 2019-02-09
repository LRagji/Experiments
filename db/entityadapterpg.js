let fpType = require('filter-query-parser-pg').filterQueryParserPg;

class entityAdapterPg {
    constructor(tableName, entityPropertiesMap,pgPool) {
        this._tableName = tableName;
        this._columns = entityPropertiesMap; //Array of { name: propertyName, type: sqlColumnName }
        this._qureyBuilder = new fpType(entityPropertiesMap);
        this._pgPool=pgPool;
    }

    createRecord(propertiesNamesAndValues) {
        let insertQuery = "insert into " + this._tableName + "(";
        let columnsValues = [];
        let valuesCommand = "values(";

        if (this._columns.length <= 0) throw new Error("No columns defined for " + this._tableName + ", for insert operation.");

        Object.entries(propertiesNamesAndValues).forEach(kvp => {
            let columnName = kvp[0], columnvalue = kvp[1];
            let column = this._columns.filter(e => e.name.toLowerCase() === columnName.toLowerCase())
            if (column.length <= 0) throw new Error("No column defination for " + columnName + ", Please define column for same.");
            column = column[0];
            insertQuery += " " + column.name + ",";
            valuesCommand += " $" + (columnsValues.length + 1) + ",";
            columnsValues.push(columnvalue);
        });

        insertQuery = insertQuery.substring(0, insertQuery.length - 1);
        insertQuery += ")";
        valuesCommand = valuesCommand.substring(0, valuesCommand.length - 1);
        valuesCommand += ")";
        insertQuery = insertQuery + " " + valuesCommand + " RETURNING ID";
        return {
            query: insertQuery,
            argumentsArray: columnsValues
        }
    }

    updateRecord(propertiesNamesAndValues) {
        let updateQuery = "update " + this._tableName + " set";
        let columnsValues = [];

        if (this._columns.length <= 0) throw new Error("No columns defined for " + this._tableName + ", for update operation.");

        Object.entries(propertiesNamesAndValues).forEach(kvp => {
            let columnName = kvp[0], columnvalue = kvp[1];
            let column = this._columns.filter(e => e.name.toLowerCase() === columnName.toLowerCase())
            if (column.length <= 0) throw new Error("No column defination for " + columnName + ", Please define column for same.");
            column = column[0];
            updateQuery += " " + column.name + " = $" + (columnsValues.length + 1) + ",";
            columnsValues.push(columnvalue);
        });

        updateQuery = updateQuery.substring(0, updateQuery.length - 1);
        return {
            query: updateQuery,
            argumentsArray: columnsValues
        }
    }

    readRecords(pageNo, size, filterJson) {
        pageNo = parseInt(pageNo);
        size = parseInt(size);
        if (isNaN(pageNo)) throw new Error("Invalid parameter pageNo");
        if (isNaN(size)) throw new Error("Invalid parameter size");

        let startIndex = (pageNo * size);
        let argumentArray = [size, startIndex];

        let filterClause = this._queryBuilder.constructWhereClause(filter, argumentArray) + this._queryBuilder.constructOrderByClause(filterJson);

        let selectQuery = 'select * from products ' + filterClause + ' limit $1 offset $2';
        let response = await this._pgPool.query(selectQuery, argumentArray);

        //let fetchedProducts = [];
        //response.rows.forEach(row => fetchedProducts.push(this._rowToProduct(row)));

        return response;
    }
}
module.exports = entityAdapterPg;