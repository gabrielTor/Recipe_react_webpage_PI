const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('diet_types', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    timestamps: false
  });
};