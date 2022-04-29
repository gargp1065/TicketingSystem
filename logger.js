const {createLogger, transports, format} = require('winston');

const logger = createLogger({
    format: format.combine(
        format.timestamp({format: "YYYY-MM-DD HH:mm:ss:ms"}),
        format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.File({
            filename: "log.js",
            json: false, 
            maxsize: 52425880,
            maxFiles: 5,
        }),
        new transports.Console(),
    ],
});
module.exports = logger;