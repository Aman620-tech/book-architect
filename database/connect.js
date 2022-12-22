const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");
const wholeSaleModel = require("./wholeSale");
const retailerModel = require("./retailer");
const stockModel = require("./stock");

const { DBHOST, DBPORT, DBUSER, DBPASSWORD, DBDB } = process.env;

const sequelize = new Sequelize(DBDB, DBUSER, DBPASSWORD, {
  port: DBPORT,
  host: DBHOST,
  dialect: "mysql",
  logging: true,
  logging: console.log,
});

sequelize
  .authenticate()
  .then(console.log("Connection has been established successfully."))
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

sequelize.sync({ force: false });

let wholeSaler = wholeSaleModel(sequelize, Sequelize);
let retailer = retailerModel(sequelize, Sequelize);
let stock = stockModel(sequelize, Sequelize);

wholeSaler.belongsToMany(retailer, { through: "stock" });
retailer.belongsToMany(wholeSaler, { through: "stock" });

module.exports = { wholeSaler, retailer, stock,sequelize };
