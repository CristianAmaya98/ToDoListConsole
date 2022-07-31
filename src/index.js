const { homeConsole, headerConsole, inputConsole, selectConsole } = require('./views/viewConsole');
const Task = require("./models/task");
const TaskController = require("./controllers/task");

const menuItems = [
    { key: 1, name: 'Crear una nueva tarea', value: 1 },
    { key: 2, name: 'Tareas pendientes', value: 2 },
    { key: 3, name: 'Tareas Completadas', value: 3 },
    { key: 0, name: 'Salir', value: 0 }]

//selectConsole(["Completado", "En Proceso", "Pendiente", "Inconvenientes"])
const main = async () => {


    
    let close = true;
    const taskController = new TaskController();
  

    do {
        const result = await homeConsole(menuItems, true);
        switch (result.opcion) {
            
            case 1:
                headerConsole("REGISTRAR NUEVA TAREA    ");
                await registrerTask(taskController);
                break;
            
            case 2:
                console.log(taskController.getAllTask())
                break;
            
            case 0:
                close = false;
                break

            default:
                main()
                break;
        }
    } while (close);

}

const registrerTask = async (controller) => {
    
    const task = new Task();
    const newTask = await inputConsole("Nombre Tarea");
    const prioritySelect = await selectConsole("Seleccione la prioridad ? ", ["Baja", "Media", "Alta", "Urgente"]);

    task.nameTask = newTask.result;
    task.priority = prioritySelect.opcion;

    controller.createTask(task)
}


main();