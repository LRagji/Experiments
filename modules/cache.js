var cache = require('memory-cache');
class memCache {
    constructor() {
        this.insert = this.insert.bind(this);
        this.fetch = this.fetch.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.hasData = this.hasData.bind(this);
        this.fetchAllKeyValuePairs = this.fetchAllKeyValuePairs.bind(this);
    }

    insert(key, value) {
        cache.put(key, value);
    }

    fetch(key) {
        return cache.get(key);
    }

    delete(key) {
        if (cache.del(key)) {
        }
        else {
            throw new Error("Failed to remove the item from cache.");
        }
    }

    update(key, value) {
        if (cache.del(key)) {
            cache.put(key, value);
        }
        else {
            throw new Error("Failed to remove the item from cache.");
        }
    }

    hasData() {
        return cache.size() > 0;
    }

    fetchAllKeyValuePairs(formatterFunction) {
        let results = [];
        cache.keys().forEach(key => {
            results.push(formatterFunction(key, this.fetch(key)));
        });
        return results;
    }
}

module.exports = memCache;