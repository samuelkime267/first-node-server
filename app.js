// const http = require("http");

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const adminRoute = require("./routes/admin");
const publicRoute = require("./routes/shop");
const rootDir = require("./utils/path");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

app.use("/admin", adminRoute);
app.use(publicRoute);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

app.listen(8080);
