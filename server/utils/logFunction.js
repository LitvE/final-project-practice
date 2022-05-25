const fs = require('fs');

module.exports.errorLogging = (error) => {
    const erroLog = {
        message: error.message,
        time: new Date(),
        code: error.code,
        stackTrace: new Error().stack,
    }
    let jsonErrorLog = JSON.stringify(erroLog);
    
    fs.appendFile('/server/errors/errors.log', jsonErrorLog + '\n', (err) => {
        if (err) {
            console.error(err);
            return;
        }

    });
}