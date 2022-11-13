let DataTypes = require("sequelize").DataTypes;
let _screens = require("./screens");
let _tickets = require("./tickets");
let _timeslots = require("./timeslots");

function initModels(sequelize) {
  let screens = _screens(sequelize, DataTypes);
  let tickets = _tickets(sequelize, DataTypes);
  let timeslots = _timeslots(sequelize, DataTypes);

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
