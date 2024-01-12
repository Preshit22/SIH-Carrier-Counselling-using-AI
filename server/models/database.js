const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch(() => {
    console.log("No connection");
  });
