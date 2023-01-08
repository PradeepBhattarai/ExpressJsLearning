const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require('passport');
const MongoStore = require('connect-mongo');
require('./strategies/local');


//Routes
const groceriesRoute = require("./routes/groceries");
const marketRouter = require("./routes/markets");
const authRoute = require("./routes/auth");

require('./database/connect');

const app = express();
const port = 8000;



//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded());

app.use(cookieParser());
app.use(
  session({
    secret: "computerEngineerPradeepBhattarai",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl:"mongodb+srv://root:root@cluster0.uqq7r.mongodb.net/test"
    }),
  })
);

app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}}`);
  next();
});

//for login middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoute);
app.use("/api/groceries", groceriesRoute);
app.use("/api/markets", marketRouter);

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});

//https://google.com/?q=java   query Parameters
