let healthLinksArray = [];

class healthLinks {

    constructor() {

        this.createHealthLink = this.createHealthLink.bind(this);
        this.updateHealthLink = this.updateHealthLink.bind(this);
        this.deleteHealthLink = this.deleteHealthLink.bind(this);
        this.getAllHealthLinks = this.getAllHealthLinks.bind(this);
        this.getHealthLinkContentFor = this.getHealthLinkContentFor.bind(this);
        this.isNameTaken = this.isNameTaken.bind(this);

        if (healthLinksArray.length === 0) {
            for (let i = 0; i < 1;)
                this.createHealthLink("Link " + i, "Random html text for link " + i).then(i++);
        }

    }

    static singleton() {
        if (this.instance === undefined) {
            this.instance = new healthLinks();
        }
        return this.instance;
    }

    async getAllHealthLinks() {
        return new Promise((acc, rej) => {
            try {
                acc(healthLinksArray);
            } catch (err) {
                rej(err);
            }
        });
    }

    async createHealthLink(name, contents) {
        return new Promise((acc, rej) => {
            try {

                if (healthLinksArray.find((l) => l.name === name) !== undefined) throw new Error(name + " name already exists.");
                let healthLinkObj = {
                    "name": name,
                    "url": "/healthLinks?id=" + encodeURIComponent(name),
                    "contents": contents
                };
                healthLinksArray.push(healthLinkObj);

                acc();

            } catch (err) {
                rej(err);
            }
        });
    }

    async deleteHealthLink(name) {
        return new Promise((acc, rej) => {
            try {
                let dbHealthLinkIdx = healthLinksArray.findIndex((l) => l.name === name);
                if (dbHealthLinkIdx < 0) throw new Error("Health link " + name + " doesnot exists.");

                healthLinksArray.splice(dbHealthLinkIdx, 1);

                acc();

            } catch (err) {
                rej(err);
            }
        });
    }

    async updateHealthLink(name, contents) {
        return new Promise((acc, rej) => {
            try {
                let dbHealthLinkIdx = healthLinksArray.findIndex((l) => l.name === name);
                if (dbHealthLinkIdx < 0) throw new Error("Health link " + name + " doesnot exists.");

                healthLinksArray[dbHealthLinkIdx].contents = contents;

                acc();

            } catch (err) {
                rej(err);
            }
        });
    }

    isNameTaken(name) {
        return new Promise((acc, rej) => {
            try {
                let dbHealthLinkIdx = healthLinksArray.findIndex((l) => l.name === name);
                acc(dbHealthLinkIdx >= 0);
            } catch (err) {
                rej(err);
            }
        })
    }

    async getHealthLinkContentFor(name) {
        return new Promise((acc, rej) => {
            try {
                let dbHealthLinkIdx = healthLinksArray.findIndex((l) => l.name === name);
                if (dbHealthLinkIdx < 0) throw new Error("Health link " + name + " doesnot exists.");
                acc(Object.assign({}, healthLinksArray[dbHealthLinkIdx]));
            } catch (err) {
                rej(err);
            }
        })
    }

}

module.exports = healthLinks;