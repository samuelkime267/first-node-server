const express = require("express");
const path = require("path");

const rootDir = require("../utils/path");
const { products } = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log(products);
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
  res.render("shop", { prods: products, pageTitle: "Shop", path: "/" });
});

module.exports = router;
