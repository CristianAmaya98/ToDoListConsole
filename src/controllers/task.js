const { PATH_RUTA, NAME_DATABASE, TABLE_DATABASE } = require("../utils/config.const");
const { responseMsg } = require('../utils/response')

module.exports = class TaskController {

    tasks = [];
    sqlite = undefined;
    directoryUtils = undefined;

    constructor(sqlite, directoryUtils) {
        this.sqlite = sqlite;
        this.directoryUtils = directoryUtils;
    }

    async inicializarTaskController() {

        if (!this.sqlite) return responseMsg('SQLITE_INSTANCE_INVALIDE', false);

        this.validateInstanceDirectory(PATH_RUTA);

        try {

            const databaseReponse = await this.sqlite.initDataBase(`${PATH_RUTA}/${NAME_DATABASE}`);
            const { status } = databaseReponse;
            if (status) {
                if (!this._inicializarTableDatabase()) return responseMsg('INICIALIZACION_TABLAS_DATABASE_FALLIDO');
                this._getTaskFindAll();
            }
            return databaseReponse;
        } catch (error) {
            return responseMsg('CONTROLLER_TASK_THROW_INIT', false);
        }
    }


    async _inicializarTableDatabase() {
        const { status } = await this.sqlite.createTable(TABLE_DATABASE);
        return status;
    }

    async _getTaskFindAll() {
        const { status, tasks } = await this.sqlite.findAll("SELECT * FROM TASKS ");
        if (status) {
            this.tasks = tasks;
        }
    }



    validateInstanceDirectory(path = '') {
        if (this.directoryUtils) {
            this.directoryUtils.createDirectory(path)
        }
    }

    createTask(task) {
        return this.sqlite.insert("INSERT INTO TASKS VALUES (?,?,?,?)", Object.values(task));
    }


    getAllTask() {
        return [...this.tasks];
    }

    getAllTaskStatus(status = '') {
        if (status == '') return [];

        return this.getAllTask()
            .filter(task => task.status == status)
            .map(task => {
                return Object.values(task)
            });
    }
}