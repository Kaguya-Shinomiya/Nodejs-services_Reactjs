const fs = require('fs');
const path = require('path');
const moment = require('moment');
const logController = require('../controllers/logs');
const log_admin = require('./logger');

const auditPath = path.join(__dirname, '../logs/.dc381d7a01bc34639481918e592d592acd8b0184-audit.json');
const logFolder = path.join(__dirname, '../logs');

module.exports = async function cleanOldLogs() {

    if (!fs.existsSync(auditPath)) {
        console.error('Không tìm thấy audit.json!');
        return;
    }

    const audit = require(auditPath);
    const retentionDays = audit.keep.amount || 14;
    const now = moment();

    for (const file of audit.files) {
        const fileDate = moment(file.date);
        const age = now.diff(fileDate, 'days');
        if (age > retentionDays) {
           
            const baseName = path.basename(file.name);
            const fullPath = path.join(logFolder, baseName);
            if (!fs.existsSync(fullPath)) {
                await logController.DeleteLog(baseName);
                log_admin.info(`Đã xóa ${baseName} khỏi MongoDB (quá ${retentionDays} ngày và không còn trong logs/)`);
            }
        }
    }
};
