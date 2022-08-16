const fs = require('fs');

module.exports = class DirectoryUtils {

    constructor() { }


    verificiarDirectory(path = '') {
        return fs.existsSync(path);
    }

    createDirectory(path = '') {
        if (this.verificiarDirectory(path)) return;

        fs.mkdirSync(path);
    }
}