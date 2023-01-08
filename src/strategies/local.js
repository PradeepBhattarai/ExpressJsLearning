
const passport = require("passport");
const { Strategy } = require("passport-local");
const User = require("../database/schemas/user");
const { comparePassword } = require("../utils/helpers");


passport.serializeUser((user,done) => {
  // console.log("serializing user");
  // console.log(user);
  done(null, user.id);
})
passport.deserializeUser(async (id, done) => {
  // console.log('deserilizing user');
  console.log(id);
  try {
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');
    // console.log(user);
    done(null, user);

  } catch (err) {
    console.log(err);
  }
})

passport.use(
  new Strategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        if (!email || !password) {
          throw new Error("Bad Request. Missing credentials");
        }
        const userDB = await User.findOne({ email });
        if (!userDB) throw new Error("User not found");
        const isValid = comparePassword(password, userDB.password);
        if (isValid) {
          console.log("Authenticated Successfully!");
          done(null, userDB);
        } else {
          done(null, null);
        }
      } catch (err) {
        done(err, null);
      }
    }
  )
);
