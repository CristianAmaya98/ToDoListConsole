const sqlite3 = require('sqlite3').verbose();
const { responseMsg, reponseMsgTask } = require('../utils/response');
require('dotenv').config()

module.exports = class SQLite {

    dataBase = undefined;

    constructor() { }

    initDataBase(databaseUrl = '') {
        if (databaseUrl == undefined || databaseUrl == '') return responseMsg('URL_NO_VALIDA', false);

        return new Promise((resolve, reject) => {
            this.dataBase = new sqlite3.Database(databaseUrl, (error) => {
                if (error) {
                    reject(responseMsg(error.message, false));
                    return;
                }
                resolve(responseMsg('BASE_DE_DATOS_CREADA_CORRECTAMENTE', true));
            })
        });

    }

    createTable(dataSQl = []) {
        if (dataSQl.length == 0) return responseMsg('SENTENCIA_NO_VALIDA', false);

        return new Promise((resolve, reject) => {

            dataSQl.forEach(sql => {
                try {
                    this.dataBase.run(sql, (error) => {
                        if (error) {
                            throw error.message;
                        }
                    });

                    resolve(responseMsg('TABLA_CREATE_EXITOSAMENTE', true));
                } catch (error) {
                    reject(responseMsg(error.message, false));
                }
            });


        });
    }


    insert(sql = '', data = []) {
        if (data.length <= 0) return responseMsg('DATA_DE_INSERCCION_ESTA_VACIA', false);
        if (sql == '') return responseMsg('CONSULTA_SQL_NO_VALIDA', false);

        return new Promise((resolve, reject) => {
            const stmt = this.dataBase.prepare(sql);
            stmt.run([...data], error => {
                if (error) {
                    reject(responseMsg(error.message, false));
                }
                resolve(responseMsg('TAREA_REGISTRADA_EXITOSAMENTE', true));
            });
            stmt.finalize();
        });
    }


    findAll(sql = '') {
        if (sql == '') return responseMsg('CONSULTA_SQL_NO_VALIDA', false);
        return new Promise((resolve, reject) => {
            this.dataBase.all(sql, (error, tasks) => {
                if (error) {
                    reject(reponseMsgTask(error.message, tasks, false))
                }

                resolve(reponseMsgTask('DATOS_ENCONTRADOS', tasks, true));
            });

        });
    }


}