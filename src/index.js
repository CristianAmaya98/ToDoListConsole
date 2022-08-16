const { homeConsole, headerConsole, inputConsole, selectConsole, tableConsole, notificationConsole } = require('./views/viewConsole');
const Task = require("./models/task");
const TaskController = require("./controllers/task");
const SQLite = require('./config/sqlite');
const DirectoryUtils = require('./utils/directory-utils');
const { MENU_ITEMS } = require('./utils/config.const');


//selectConsole(["Completado", "En Proceso", "Pendiente", "Inconvenientes"])
const main = async () => {

    const taskController = new TaskController(new SQLite(), new DirectoryUtils());

    const { status, message } = await taskController.inicializarTaskController();
    notificationConsole(message, status);
    if (!status) return;

    mainMenu(taskController);
}


const mainMenu = async (taskController) => {
    let close = true;
    do {
        const result = await homeConsole(MENU_ITEMS, true);
        console.log(result.opcion)
        switch (result.opcion) {
            case 1:
                headerConsole("REGISTRAR NUEVA TAREA");
                await registrerTask(taskController);
                break;

            case 3:
                console.log(taskController.getAllTask())
                break;

            case 4:
                await getAllPendiente(taskController);
                break

            case 0:
                close = false;
                break

            default:
                continue;
        }
    } while (close);
}

const registrerTask = async (controller) => {

    const task = new Task();
    const newTask = await inputConsole("Nombre Tarea");
    const prioritySelect = await selectConsole("Seleccione la prioridad ? ", ["Baja", "Media", "Alta", "Urgente"]);

    task.nameTask = newTask.result;
    task.priority = prioritySelect.opcion;

    const { status, message } = await controller.createTask(task);
    notificationConsole(message, status)
}


const getAllPendiente = async (taskController) => {
    const tasks = taskController.getAllTaskStatus("Pendiente");
    if (tasks.length == 0) {
        notificationConsole('NO_SE_ENCONTRARON_RESULTADOS');
        return;
    }
    
    await tableConsole('TAREAS PENDIENTES.', tasks);
}

main();