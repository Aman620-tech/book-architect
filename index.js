const dotenv = require("dotenv").config({ path: ".env" });
const express = require("express");
const app = express();
const port = parseInt(process.env.PORT) || 3004;

app.use(express.json());


const { routes } = require("./routes");

app.use("/", routes);

app.listen(port, (err) => {
  if (err) {
    return console.log({ Error: err.message });
  }
  console.log(`server started at http://localhost:${port}`);
});
