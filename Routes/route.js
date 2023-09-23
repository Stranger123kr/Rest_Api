const express = require("express");
const router = express.Router();
const GetAppProducts = require("../Controller/products");

router.get("/", GetAppProducts.Home);
router.get("/testing", GetAppProducts.Testing);

module.exports = router;
