const SQLite = require("./sqlite");


let sqlite = undefined;

describe("SQLITE", () => {

    beforeAll(() => {
        sqlite = new SQLite();
    });

    test("#SQlite Object Create Success", () => {
        expect(sqlite).toBeTruthy()
    })


    describe('#initDataBase', () => {

        test('#initDataBase Test inicializando Base Datos Success', async () => {
            const { status } = await sqlite.initDataBase(':memory:');
            expect(status).toBe(200);
        });

        test('#initDataBase Test inicializando Base Datos Failed', async () => {
            const { status, message } = await sqlite.initDataBase(undefined);
            expect(status).toBe(400);
            expect(message).toEqual('URL NO VALIDA');
        });

        test('#initDataBase Test inicializando Base Datos  sqlite3.Database Falied  \"\" ', async () => {
            const { status } = await sqlite.initDataBase('');
            expect(status).toBe(400);
        });

        test('#initDataBase Test inicializando Base Datos Param undefined ', async () => {
            const { status } = await sqlite.initDataBase(undefined);
            expect(status).toBe(400);
        });

    });


    describe('#createTable', () => {
        test('#createTable Test setup multiple create sucess', async () => {
            const arrayCreates = [
                "CREATE TABLE IF NOT EXISTS TASKS (name text, priority text, dateCreate text, status text)",
                "CREATE TABLE IF NOT EXISTS PRUEBA (name text, priority text, dateCreate text, status text)"
            ]

            const { status } = await sqlite.createTable(arrayCreates);
            expect(status).toBe(200)
        });

        test('#createTable Test setup multiple create array empty', async () => {
            const arrayCreates = [];
            const { status } = await sqlite.createTable(arrayCreates);
            expect(status).toBe(400);
        });

        test('#createTable Test setup multiple create array undefined', async () => {
            const { status } = await sqlite.createTable(undefined);
            expect(status).toBe(400);
        });

        test('#createTable Test setup create throw exception exists table', async () => {
            try {
                const arrayCreates = [
                    "CREATE TABLE  TASKS (name text, priority text, dateCreate text, status text)"
                ]
                await sqlite.createTable(arrayCreates);

            } catch (error) {
                expect(error.status).toBe(200);
            }
        });
    });


    describe('#insert', () => {

        test('#insert multiply insert of taks', async () => {
            const sql = "INSERT INTO TASKS VALUES (?,?,?,?)";
            const tasks = [
                {
                    nameTask: 'test',
                    priority: 'alta',
                    dateCreate: new Date(),
                    statusTask: 'Pendiente'
                }
            ];

            const { status, message } = await sqlite.insert(sql, tasks);
            expect(status).toBe(200);
            expect(message).toEqual('TAREA_REGISTRADA_EXITOSAMENTE')
        });


        test('#insert multiply insert of taks empity', async () => {
            const sql = "INSERT INTO TASKS VALUES (?,?,?,?)";
            const tasks = [];

            const { status, message } = await sqlite.insert(sql, tasks);
            expect(status).toBe(400);
            expect(message).toEqual('DATA_DE_INSERCCION_ESTA_VACIA')
        });


    });
});
