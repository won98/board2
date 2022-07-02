const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const compression = require("compression");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const { Users } = require("./models");
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
app.use(compression());
app.use(helmet());
app.use("/img", express.static("./uploads"));

app.use("/board", Router.BoardRoute);
app.use("/user", Router.UserRoute);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
