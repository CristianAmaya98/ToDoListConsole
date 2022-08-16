require('colors');
const inquirer = require('inquirer');
const { table } = require('table')

const headerConsole = (mensaje = '') => {

    let itemX = []
    const longitudCadena = mensaje.length + 8;

    for (let index = 0; index < longitudCadena; index++) {
        itemX.push("*")
    }

    const separador = itemX.join('');


    console.log(separador.green);
    console.log(`    ${mensaje.toUpperCase()}    `.green);
    console.log(separador.green);
}

const notificationConsole = (message = '', status = true) => {
    if (!status) {
        console.log(`=> ${message}`.red);
        return;
    }
    console.log(`=> ${message}`.green);
}



const homeConsole = (itemsMenu = [], header = false) => {
    if (header) {
        headerConsole('BIENVENIDO AL SISTEMA TODOLIST')
    }

    if (itemsMenu) {
        return inquirer.prompt([{
            type: 'rawlist',
            name: 'opcion',
            message: 'Seleccione la opcion ?',
            choices: itemsMenu,
            loop: true
        }]);
    }
}

const inputConsole = (message) => {
    return inquirer.prompt([{
        type: 'input',
        name: 'result',
        message,
        default: ''
    }]);
}

const selectConsole = (message = '', itemsOption = []) => {
    if (itemsOption == []) return;

    return inquirer.prompt([{
        type: 'list',
        name: 'opcion',
        message,
        choices: itemsOption,
        default: itemsOption[0],
        loop: true
    }])
}


const tableConsole = (header = '', data = []) => {
    const config = {
        border: {
            topBody: `─`,
            topJoin: `┬`,
            topLeft: `┌`,
            topRight: `┐`,

            bottomBody: `─`,
            bottomJoin: `┴`,
            bottomLeft: `└`,
            bottomRight: `┘`,

            bodyLeft: `│`,
            bodyRight: `│`,
            bodyJoin: `│`,

            joinBody: `─`,
            joinLeft: `├`,
            joinRight: `┤`,
            joinJoin: `┼`
        },
        columnDefault: {
            width: 30,
        },
        header: {
            alignment: 'center',
            content: header,
        },
    };

    console.log(table(data, config));
}



module.exports = {
    homeConsole,
    headerConsole,
    inputConsole,
    selectConsole,
    tableConsole,
    notificationConsole
}