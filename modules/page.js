class page {
    constructor(dataAccessService, utilityService, constantsService,textService) {
        this.dal = dataAccessService;
        this.util = utilityService;
        this.const = constantsService;
        this.textService = textService;
    }
}

module.exports = page;