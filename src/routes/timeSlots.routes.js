
const timeSlotsController = require("../controllers/timeSlots.controller");
module.exports = app => {

 app.get("/timeslots",timeSlotsController.getAvailableTimeSlots)
 

}