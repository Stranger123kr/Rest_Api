require("dotenv").config();
const connectDB = require("./Database/MongoDb");
const JsonFile = require("./products.json");
const products = require("./Models/ProductSchema");

const start = async () => {
  try {
    await connectDB(process.env.DATABASE_NAME);
    await products.deleteMany();
    await products.create(JsonFile);
    console.log("data save successful");
  } catch (error) {
    console.log(error);
  }
};

start();
