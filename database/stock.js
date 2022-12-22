"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  stock.init(
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      wholeSalerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "wholeSalers",
          key: "id",
        },
      },
      retailerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "retailers",
          key: "id",
        },
      },
      stock_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "stock",
    }
  );
  return stock;
};
