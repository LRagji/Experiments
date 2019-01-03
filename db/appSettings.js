class appSettings {

    constructor() {

        this.settings = { tax: 10 };

        this.createSetting = this.createSetting.bind(this);
        this.readSetting = this.readSetting.bind(this);
        this.updateSetting = this.updateSetting.bind(this);
        this.deleteSetting = this.deleteSetting.bind(this);
        this.readAllSettings = this.readAllSettings.bind(this);
    }

    static singleton() {
        if (this.instance === undefined) {
            this.instance = new appSettings();
        }
        return this.instance;
    }

    createSetting(key, value) {
        return new Promise((acc, rej) => {
            try {
                if (this.settings.hasOwnProperty(key)) {
                    throw new Error(key + " already exists.");
                }
                else {
                    this.settings.key = value;
                    acc(undefined);
                }
            } catch (err) {
                rej(err);
            }
        });
    }

    readSetting(key) {
        return new Promise((acc, rej) => {
            try {
                if (this.settings.hasOwnProperty(key)) {
                    acc(this.settings[key]);
                }
                else {
                    acc(undefined);
                }
            } catch (err) {
                rej(err);
            }
        });
    }

    readAllSettings() {
        return new Promise((acc, rej) => {
            try {
                acc(this.settings);
            } catch (err) {
                rej(err);
            }
        });
    }

    updateSetting(key, value) {
        return new Promise((acc, rej) => {
            try {
                if (!this.settings.hasOwnProperty(key)) {
                    throw new Error(key + " doesnt exists.");
                }
                else {
                    this.settings.key = value;
                    acc(undefined);
                }
            } catch (err) {
                rej(err);
            }
        });
    }

    deleteSetting(key, value) {
        return new Promise((acc, rej) => {
            try {
                if (!this.settings.hasOwnProperty(key)) {
                    throw new Error(key + " doesnt exists.");
                }
                else {
                    delete this.settings.key;
                    acc(undefined);
                }
            } catch (err) {
                rej(err);
            }
        });
    }
}

module.exports = appSettings;