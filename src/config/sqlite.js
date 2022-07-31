const fs = require('fs')
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config()
const colors = require('colors');


module.exports = class SQLite {

    dataBase = undefined;

    constructor() {

    }

    createDirectory(path = '') {
        if (fs.existsSync(path)) return;
        fs.mkdirSync(path);
    }


    async initDataBase() {
        const carpeta = `${__dirname}/../../${(!process.env.DIRECTORY) ? 'database' : process.env.DIRECTORY}`;
        const ruta = `${carpeta}/${(!process.env.SQLITE_NAME) ? 'data' : process.env.SQLITE_NAME}.db`;

        this.createDirectory(carpeta);

        return new Promise((resolve, reject) => {
            this.dataBase = new sqlite3.Database(ruta, (error) => {
                if (error) {
                    reject({
                        status: false,
                        message: error.message
                    });
                }
                resolve({
                    status: true,
                    message: 'BASE DE DATOS CREADA CORRECTAMENTE'
                });
            });
        });
    }


    async createTable() {
        return new Promise((resolve, reject) => {
            this.dataBase.run("CREATE TABLE IF NOT EXISTS TASKS (name text, priority text, dateCreate text, status text)", (error) => {
                //console.log(resp)
                if (error) {
                    reject({
                        status: false,
                        message: error.message
                    });
                }

                resolve({
                    status: true,
                    message: 'TABLA CREATE EXITOSAMENTE'
                });
            });
        })
    }

    insert(data = []) {
        const stmt = this.dataBase.prepare("INSERT INTO TASKS VALUES (?,?,?,?)");
        stmt.run(data[0], data[1], data[2], data[3]);
        stmt.finalize();
    }

    async findAll() {



        return new Promise((resolve, reject) => {
            this.dataBase.all("SELECT * FROM TASKS ", (error, tasks) => {
                if (error) {
                    reject({
                        status: false,
                        message: error.message,
                        tasks
                    })
                }

                resolve({
                    status: true,
                    message: '',
                    tasks
                });
            });

        });


    }

    //console.log('initDataBase')
    // this.dataBase.run("CREATE TABLE lorem (info TEXT)", ((successResult) => {
    //     console.log(successResult)
    // }));
}