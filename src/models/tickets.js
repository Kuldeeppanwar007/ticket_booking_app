const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tickets', {
    Id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    ticketNo: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    date: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    screenId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'screens',
        key: 'screenId'
      }
    },
    seatNo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    mobileNo: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    createdBy: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    updatedBy: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    slotId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'timeslots',
        key: 'slotId'
      }
    },
    isCancled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'tickets',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "tickets_pkey",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};
