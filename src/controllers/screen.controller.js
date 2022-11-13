require("dotenv").config();
let db = require("../db/connToDb");
const logger = require("../logger");





exports.getAvailableScreens = async (req, res) => {
  try {

    const screens = await db.models.screens.findAll();
   
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
