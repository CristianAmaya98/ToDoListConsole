module.exports = class Task {

    constructor(nameTask, priority) {
        this.nameTask = nameTask;
        this.priority = priority;
        this.dateCreate = new Date();
        this.statusTask = "Pendiente";
    }
}