require("dotenv").config();
let db = require("../db/connToDb");
const logger = require("../logger");





exports.getAvailableScreens = async (req, res) => {
  try {
    logger.info("req come at getAvailableScreens() - started");
    const screens = await db.models.screens.findAll();
    
    logger.info("req come at getAvailableScreens() - ended");
    res.json({
      message: "screens fetch successfully",
       screens,
    });
    return;
  } catch (error) {
    logger.error("req come at getAvailableScreens() - Error Occured");
    res.status(400).send("something went wrong!");
    return;
  }
};
