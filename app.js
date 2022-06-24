const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const cors = require("cors");
//const bodyParser = require("body-parser");
const { sequelize } = require("./models");
const Router = require("./routes");

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("OK");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());
//app.use(bodyParser.json());
app.use(cors());
app.use("/img", express.static("./uploads"));

app.use("/", Router.BoardRoute);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
