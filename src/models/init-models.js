var DataTypes = require("sequelize").DataTypes;
var _screens = require("./screens");
var _tickets = require("./tickets");
var _timeslots = require("./timeslots");

function initModels(sequelize) {
  var screens = _screens(sequelize, DataTypes);
  var tickets = _tickets(sequelize, DataTypes);
  var timeslots = _timeslots(sequelize, DataTypes);

  tickets.belongsTo(screens, { as: "screen", foreignKey: "screenId"});
  screens.hasMany(tickets, { as: "tickets", foreignKey: "screenId"});
  tickets.belongsTo(timeslots, { as: "slot", foreignKey: "slotId"});
  timeslots.hasMany(tickets, { as: "tickets", foreignKey: "slotId"});

  return {
    screens,
    tickets,
    timeslots,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
