const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://root:root@cluster0.uqq7r.mongodb.net/test"
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));
