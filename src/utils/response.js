const responseMsg = (message = '', status = true) => {
    return {
        status,
        message
    }
}

const reponseMsgTask = (message = '', tasks = [], status = true) => {
    return {
        ...responseMsg(message, status),
        tasks
    }
}


module.exports = {
    responseMsg,
    reponseMsgTask
}