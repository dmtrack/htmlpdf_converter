"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { format, createLogger, transports, config } = require('winston');
const logger = createLogger({
    levels: config.syslog.levels,
    format: format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new transports.File({
            filename: './src/logs/info.log',
            level: 'info',
            format: format.combine(format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }), format.align(), format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`)),
        }),
    ],
});
module.exports = logger;
