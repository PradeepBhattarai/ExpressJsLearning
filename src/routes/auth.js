const { Router } = require("express");

const passport = require("passport");

const User = require("../database/schemas/user");

const { hashPassword, comparePassword } = require("../utils/helpers");

const router = Router();

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.sendStatus(400);
//   } else {
//     const userDB = await User.findOne({ email });
//     if (!userDB) return res.sendStatus(401);
//     const isValid = comparePassword(password, userDB.password);
//     if (isValid) {
//       req.session.user = userDB;
//       return res.sendStatus(200);
//     } else {
//       return res.sendStatus(401);
//     }
//   }
// });

router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log('Logged In');
  res.sendStatus(200);
});

router.post("/register", async (req, res) => {
  const { email } = req.body;
  const userDB = await User.findOne({ email });
  if (userDB) {
    res.status(400).send({ msg: "user already exists" });
  } else {
    const password = hashPassword(req.body.password);
    console.log(password);
    const newUser = await User.create({ email, password });
    // newUser.save;
    res.sendStatus(201);
  }
});

module.exports = router;
