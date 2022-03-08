const winston = require('winston');
const fs = require('fs');
const env = process.env.NODE_ENV || 'dev';
const logDir = 'log';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const tsFormat = () => (new Date()).toLocaleTimeString();
const logger = new (winston.Logger)({
    transports: [
        // colorize the output to the console
        new (winston.transports.Console)({
            timestamp: tsFormat,
            colorize: true,
            level: (env === 'dev') ? 'debug' : 'info'
        })
    ]
});

export default logger;