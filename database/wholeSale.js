"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class wholeSaler extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  wholeSaler.init(
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobile_number: {
        type: DataTypes.STRING,
        allowNull: false,

      }
    }, 
    {
      sequelize,
      modelName: "wholeSaler",
      
    }
  );
  return wholeSaler;
};
