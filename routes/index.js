const express = require("express");
const routes = express.Router()
const {
    allRetailer,
    retailerSingleWholeSaler,
    maxTurnover,
    monthlyTurnover,
  } = require("../controller/index");

routes.get("/all-retailer/:wholesaler_id", allRetailer);

routes.get("/retailer/single-wholesaler", retailerSingleWholeSaler);

routes.get("/monthly-turnover", monthlyTurnover);

routes.get("/max-turnover", maxTurnover);


module.exports={routes}