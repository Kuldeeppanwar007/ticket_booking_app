const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('screens', {
    screenId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    availableSheets: {
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
    }
  }, {
    sequelize,
    tableName: 'screens',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "screens_pkey",
        unique: true,
        fields: [
          { name: "screenId" },
        ]
      },
    ]
  });
};
