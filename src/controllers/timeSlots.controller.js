require("dotenv").config();
let db = require("../db/connToDb");
const logger = require("../logger");





exports.getAvailableTimeSlots = async (req, res) => {
  try {
    logger.info("req come at getAvailableTimeSlots() controller started");
    const screens = await db.models.timeslots.findAll();
    logger.info("req come at getAvailableTimeSlots() controller ended");
    res.json({
      message: "timeslots fetch successfully",
       screens,
    });
    return;
  } catch (error) {
    logger.error("req come at getAvailableTimeSlots() - Error Occured");
    res.status(400).send("something went wrong!");
    return;
  }
};
