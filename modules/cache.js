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
        console.debug("Current size for cache is " + cache.memsize() + " with " + cache.size + "entries.");
    }

    fetch(key) {
        return cache.get(key);
    }

    delete(key) {
        if (cache.del(key)) {
            console.debug("Current size for cache is " + cache.memsize() + " with " + cache.size + "entries.");
        }
        else {
            throw new Error("Failed to remove the item from cache.");
        }
    }

    update(key, value) {
        if (cache.del(key)) {
            cache.put(key, value);
            console.debug("Current size for cache is " + cache.memsize() + " with " + cache.size + "entries.");
        }
        else {
            throw new Error("Failed to remove the item from cache.");
        }
    }

    hasData() {
        return cache.size > 0;
    }

    fetchAllKeyValuePairs() {
        let results = [];
        cache.keys.forEach(key => {
            results.push({ key: this.fetch(key) });
        });
        return results;
    }
}

module.exports = memCache;