const { createLogger, format, transports } = require('winston');
require('dotenv').config();

const dev_logger = ()=>{


    
    const logger = createLogger({
        level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
        // level:'error',
        format: format.combine(format.colorize(),format.simple()),
        transports: [new transports.Console()]
        
        
    });

    return logger;
    
}
module.exports = dev_logger();