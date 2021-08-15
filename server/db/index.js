const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb://root:12345@localhost:27017/admin", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log("Mongo DB Connect Successed."))
    .catch((error) => console.log("Mongo DB Connect Failed."));
};

mongoose.connection.on(`disconnected`, () => {
  console.log(`Mongo DB Disconnected.`);

  setTimeout(() => {
    connect();
  }, 3000);
});

module.exports = connect;
