const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DATABASE_NAME);

  console.log("Database Connect Successfully");
}

module.exports = main;
