const fs = require('fs');
const path = require('path');
const moment = require('moment');
const logController = require('../controllers/logs');
const log_admin = require('./utils/logger');

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
        //console.log(`File Date: ${fileDate.format('YYYY-MM-DD HH:mm:ss')}`);
        const age = now.diff(fileDate, 'days');
        //console.log("Age: " + age);
        //console.log(`Now: ${now.format('YYYY-MM-DD HH:mm:ss')}`);
        if (age > retentionDays) {
           
            const baseName = path.basename(file.name);
            const fullPath = path.join(logFolder, baseName);
            //console.log("Age: " + age);
            //console.log("baseName: "+baseName);
            //console.log(fullPath)
            if (!fs.existsSync(fullPath)) {
                //console.log("hâhahahah");
                await logController.DeleteLog(baseName);
                //console.log(`Đã xóa ${baseName} khỏi MongoDB (quá ${retentionDays} ngày và không còn trong logs/)`);
                log_admin.info(`Đã xóa ${baseName} khỏi MongoDB (quá ${retentionDays} ngày và không còn trong logs/)`);
            }
        }
    }
};
