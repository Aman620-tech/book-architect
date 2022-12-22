const { Op } = require("sequelize");
const {
  sequelize,
  wholeSaler,
  retailer,
  stock,
} = require("../database/connect");

// const stock = require("../database/stock");
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
    const Stock = await stock.findAll({
      attributes: [
        "retailerId",
        [sequelize.fn("COUNT", sequelize.col("retailerId")), "count"],
      ],
      group: "retailerId",
    });
    const filterData = await Stock.filter((k) => {
      return k.dataValues.count === 1;
    });
    res.json({
      status: 200,
      response: "single retailer ",
      Stock,
      result: filterData,
    });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const monthlyTurnover = async (req, res) => {
  try {
    let endDate = "2022-12-25";
    // let newData = [];
    let  turnover 
    for (let i = 1; i <= 12; i++) {
      let startDate = `2022-${i}-22`;
      console.log("startDate", startDate);
      turnover = await stock.findAll({
        attributes: [
              "wholesalerId",
              "retailerId",
              "createdAt",
              [sequelize.fn("sum", sequelize.col("stock_amount")), "turnover"],
            ],
        where: {
          createdAt: {
            [Op.lt]: new Date(
              new Date(endDate).getTime() + 60 * 60 * 24 * 1000 - 1
            ),
            [Op.gt]: new Date(startDate),
          },
        }, 
      group: ["wholesalerId"],

      });
    }
    res.json({
      status: 200,
      response: "Monthly turnover of wholesaler ",
      turnover,
      // newData,
    });
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
