const inquirer = require('inquirer');
const colors = require('colors');

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




module.exports = {
    homeConsole,
    headerConsole,
    inputConsole,
    selectConsole
}