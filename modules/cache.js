var cache = require('memory-cache');
class memCache {
    constructor() {
        this.insert = this.insert.bind(this);
        this.fetch = this.fetch.bind(this);
        this.update = this.update.bind(this);
    }

    insert(key, value) {
        cache.put(key, value);
        console.debug("Current size for cache is " + cache.memsize() + " with " + cache.size + "entries.");
    }

    fetch(key) {
        return cache.get(key);
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
}

module.exports = memCache;