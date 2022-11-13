
const screenController = require("../controllers/screen.controller");
module.exports = app => {


 app.get("/screens",screenController.getAvailableScreens)
 

}