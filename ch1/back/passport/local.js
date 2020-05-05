const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");
const bcrypt = require("bcrypt");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "userId",
        passwordField: "password",
      },
      async (userId, password, done) => {
        try {
          const user = await db.User.findOne({ where: { userId } });
          if (!user) {
            return done(null, false, { reason: "this is not valid User" });
          }
          const validPassword = await bcrypt.compare(password, user.password);
          if (validPassword) {
            return done(null, user);
          }
          return done(null, false, {
            reason: "this is not valid password",
          });
        } catch (e) {
          console.error(e);
          return done(e);
        }
      }
    )
  );
};
