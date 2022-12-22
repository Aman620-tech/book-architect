const {
  sequelize,
  wholeSaler,
  retailer,
  stock,
} = require("../database/connect");
// const stock = require("../database/stock");
// const wholeSale = require("../database/wholeSale");

const allRetailer = async (req, res) => {
  try {
    const { wholesaler_id } = req.params;

    const wholeSale = await wholeSaler.findByPk(wholesaler_id);
    const Stock = await stock.findAndCountAll({
      //   attributes: ["retailerId"],
      where: { wholeSalerId: wholesaler_id },
    });

    const result = { wholeSale, retailer: Stock };

    res.json({ status: 200, response: "wholeSaler Created", result });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

const retailerSingleWholeSaler = async (req, res) => {
  try {
 

    res.json({ status: 200, response: "yearly turnover of user " });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const monthlyTurnover = async (req, res) => {
  try {
    const turnover = await stock.findAll({
      attributes: [
        "wholesalerId",
      ],
      group: ["wholesalerId"],
    });
    res.json({ status: 200, response: "Monthly turnover of wholesaler ", turnover });

  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const maxTurnover = async (req, res) => {
  try {
    const turnover = await stock.findAll({
      attributes: [
        "wholesalerId",
        [sequelize.fn("sum", sequelize.col("stock_amount")), "turnover"],
      ],
      group: ["wholesalerId"],
    });
    res.json({ status: 200, response: "yealy turnover of user ", turnover });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

module.exports = {
  allRetailer,
  retailerSingleWholeSaler,
  maxTurnover,
  monthlyTurnover,
};
