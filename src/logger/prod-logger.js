const { createLogger, format, transports } = require('winston');
require('dotenv').config();

const  d = new Date();
const date = `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}`;
function buildProdLogger() {

    return createLogger({

        format: format.combine(format.colorize(), format.timestamp(),
            format.errors({ stack: true })
            , format.json()),
        transports: [new transports.File({filename:`logs/${date}.log`})]



    })



}

module.exports = buildProdLogger();