require('dotenv').config();
let logger = null;

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
     
    logger = require('./dev-logger');

} else {

    logger = require('./prod-logger')

}


module.exports = logger;