const express = require("express");
const router = express.Router();



require("./timeSlots.routes")(router);
require("./screens.routes")(router);
require("./tickets.routes")(router);


module.exports = router;
