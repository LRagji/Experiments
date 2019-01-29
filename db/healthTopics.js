let topics = [];

class healthTopics {

    constructor() {

        this.createHealthTopic = this.createHealthTopic.bind(this);
        this.readHealthTopics = this.readHealthTopics.bind(this);
        this.updateHealthTopic = this.updateHealthTopic.bind(this);
        this.readHealthTopicById=this.readHealthTopicById.bind(this);

        if (topics.length === 0) {
            for (let i = 0; i < 20; i++) {
                this.createHealthTopic("Laukik"+i);
            }
        }
    }

    static singleton() {
        if (this.instance === undefined) {
            this.instance = new healthTopics();
        }
        return this.instance;
    }

    createHealthTopic(topicName) {
        return new Promise((acc, rej) => {
            try {
                let healthTopic = { name: topicName, id: topics.length };
                topics.push(healthTopic);
                acc(healthTopic);
            }
            catch (ex) {
                rej(ex);
            }
        });
    }

    readHealthTopicById(id) {
        return new Promise((acc, rej) => {
            try {
                id = parseInt(id);
                let idx = topics.findIndex((l) => l.id === id);
                if (idx < 0)
                    acc(undefined);
                else
                    acc(Object.assign({}, topics[idx]));
            }
            catch (ex) {
                rej(ex);
            }
        });
    }

    readHealthTopics() {
        return new Promise((acc, rej) => {
            try {
                acc(topics.map((e) => Object.assign({}, e)));
            }
            catch (ex) {
                rej(ex);
            }
        });
    }

    updateHealthTopic(id, topicName) {
        return new Promise((acc, rej) => {
            try {
                id = parseInt(id);
                let foundTopics = topics.filter((e) => e.id === id);
                if (foundTopics.length > 0) foundTopics[0].name = topicName;
                acc(Object.assign({}, foundTopics[0]));
            }
            catch (ex) {
                rej(ex);
            }
        });
    }
}

module.exports = healthTopics;