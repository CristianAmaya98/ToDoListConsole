const SQLite = require('../config/sqlite')

module.exports = class TaskController {

    tasks = [];
    sqlite = undefined;

    constructor() {
        this._initControllerTask();
    }

    async _initControllerTask() {
        this.sqlite = new SQLite();
        await this.sqlite.initDataBase();
        await this.sqlite.createTable();
        
        this.getTaskFindAll();
    }


    async getTaskFindAll() {
        const { status, message, tasks } = await this.sqlite.findAll();
        if (status) {
            this.tasks = tasks;
        }
    }


    createTask(task = undefined) {
        if (!task) return;
        this.tasks.push(task)
        this.sqlite.insert(Object.values(task));
    }

    getAllTask() {
        return this.tasks;
    }
}