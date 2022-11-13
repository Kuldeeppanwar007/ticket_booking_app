require("dotenv").config();
let db = require("../db/connToDb");
const logger = require("../logger");





exports.getAvailableTimeSlots = async (req, res) => {
  try {

    const screens = await db.models.timeslots.findAll();
   
    res.json({
      message: "sreens fetch successfully",
       screens,
    });
    return;
  } catch (error) {
    res.status(400).send("something went wrong!");
    return;
  }
};
