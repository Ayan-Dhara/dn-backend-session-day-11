const {DataTypes, Model} = require('sequelize');
const sequelize = require("../utills/database")

module.exports = sequelize.define("products", {
  // product id
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // no of products left
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
})
