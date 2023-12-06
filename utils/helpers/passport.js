const mongoose = require("mongoose");

const user = mongoose.model("user");
const argon2 = require("argon2");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;


passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, cb) {
      return user
        .findOne({ email })
        .then(async (user) => {
          if (!user) {
            return cb(null, false, { message: "Incorrect email." });
          }
          const isPasswordValid = await argon2.verify(user.password, password);

          if (!isPasswordValid) {
            return cb(null, false, { message: "Incorrect password." });
          }
          return cb(null, user, { message: "Logged In Successfully" });
        })
        .catch((err) => cb(err));
    }
  )
);


passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : process.env.SECRET_KEY
},
function (jwtPayload, cb) {
    return user.findById(jwtPayload._id)
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
}
));