// const http = require("http");

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const expressHbs = require("express-handlebars");

const { adminRoute, products } = require("./routes/admin");
const publicRoute = require("./routes/shop");
const rootDir = require("./utils/path");

const app = express();

// app.engine("hbs", expressHbs());
// app.set("view engine", "hbs");
app.set("view engine", "ejs");
// app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

app.use("/admin", adminRoute);
app.use(publicRoute);

app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

app.listen(8080);
