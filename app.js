const express = require("express");
const app = express();
require("dotenv").config();
const Port = process.env.PORT || 6000;
const Router = require("./Routes/route");
require("./Database/MongoDb");

// ==============================================
app.use(express.json());
app.use("/api/products", Router);

app.listen(Port, () => {
  console.log(`Server Listening On the Port ${Port}`);
});
