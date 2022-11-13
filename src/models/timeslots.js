const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('timeslots', {
    slotId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    time: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    createdBy: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    updatedBy: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'timeslots',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "timeslots_pkey",
        unique: true,
        fields: [
          { name: "slotId" },
        ]
      },
    ]
  });
};
