const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  // // This is for atlas
  // MongoClient.connect(
  //   "mongodb+srv://samuelkime:3R15D7jaujgHj4MC@nodejs-course.avlgfpv.mongodb.net/"
  // )

  // this is for local connection
  MongoClient.connect("mongodb://localhost:27017/node-js-course")
    .then((client) => {
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
