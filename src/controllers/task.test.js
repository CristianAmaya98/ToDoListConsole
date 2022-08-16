const TaskController = require("./task");

describe('TaskController', () => {

    let taskController = undefined;

    beforeAll(() => {
        taskController = new TaskController({
            initDataBase: (path) => { return new Promise((resolve, reject) => { resolve({ status: 200, message: '' }) }) }
        }, {})
    });

    test('#class : taskController instanciar sucess', () => {
        expect(taskController).toBeTruthy();
    })

    test('#inicializarTaskController test verify services database', () => {
        expect(taskController.inicializarTaskController()).toBeTruthy();
    });


});