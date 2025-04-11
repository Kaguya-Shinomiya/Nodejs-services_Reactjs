const winston = require('winston');
require('winston-daily-rotate-file');
const path = require('path');
const logController = require('../controllers/logs');
const moment = require('moment');


const transport = new winston.transports.DailyRotateFile({
    filename: path.join(__dirname, '../logs/%DATE%.log'),
    datePattern: 'DD-MM-YYYY',
    zippedArchive: false,
    maxSize: '20m',
    maxFiles: '14d'
});

const todayDate = moment().format(transport.options.datePattern);
const todayFilename = path.basename(transport.options.filename.replace('%DATE%', todayDate));

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [transport]
});

logController.GetLogByName(todayFilename)
    .then((existing) => {
        if (!existing) {
            return logController.CreateNewLog(todayFilename);
        }
    })
    .then(() => {
        logger.info(`(INIT) File log "${todayFilename}" đã được ghi nhận trong DB.`);
    })
    .catch((err) => {
        logger.error(`(INIT) Lỗi khi ghi nhận log vào DB: ${err.message}`);
    });

transport.on('new', (newFilename) => {
    const baseName = path.basename(newFilename);

    logController.GetLogByName(baseName)
        .then((existing) => {
            if (!existing) {
                return logController.CreateNewLog(baseName);
            }
        })
        .then(() => {
            logger.info(`(AUTO) File log "${baseName}" được thêm vào DB.`);
        })
        .catch((err) => {
            logger.error(`(AUTO) Lỗi khi thêm file "${baseName}" vào DB: ${err.message}`);
        });
});

module.exports = logger;
