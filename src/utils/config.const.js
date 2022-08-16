module.exports = {
    PATH_RUTA: `${__dirname}/../../${(!process.env.DIRECTORY) ? 'database' : process.env.DIRECTORY}`,
    NAME_DATABASE: `${(!process.env.SQLITE_NAME) ? 'data' : process.env.SQLITE_NAME}.db`,
    TABLE_DATABASE: [
        "CREATE TABLE IF NOT EXISTS TASKS (name text, priority text, dateCreate text, status text)",
        "CREATE TABLE IF NOT EXISTS PRIORITY (namePriority text)"
    ],
    
    MENU_ITEMS: [
        { key: 1, name: 'Crear una nueva tarea', value: 1 },
        { key: 2, name: 'Crear una nueva prioridad', value: 2 },
        { key: 3, name: 'Tareas pendientes', value: 3 },
        { key: 4, name: 'Tareas en proceso', value: 4 },
        { key: 5, name: 'Tareas Completadas', value: 5 },
        { key: 6, name: 'Importar y Exportar Tareas CSV', value: 6 },
        { key: 0, name: 'Salir', value: 0 }
    ]
}