const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  console.log("Cookie ehhhhhhhhhhhhh", req.get("Cookie"));
  const cookie = req.get("Cookie");
  const isLoggedIn = cookie ? cookie.split("=")[1] === "true" : false;

  console.log(req.session);

  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("691f2178ecee3243d3578e6a")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save((err) => {
        console.log(err);
        res.redirect("/");
      });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
