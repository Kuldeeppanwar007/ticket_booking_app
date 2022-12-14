// // const moment =require('moment')
const SequelizeAuto = require('sequelize-auto');

const auto = new SequelizeAuto('postgres', 'postgres', 'admin@123',{

    host: 'localhost',
    dialect: 'postgres'
});

auto.run().then(data => {
  console.log(data.tables);      // table and field list
  console.log(data.foreignKeys); // table foreign key list
  console.log(data.indexes);     // table indexes
  console.log(data.hasTriggerTables); // tables that have triggers
  console.log(data.relations);   // relationships between moṇdels
  console.log(data.text)         // text of generated models
});

