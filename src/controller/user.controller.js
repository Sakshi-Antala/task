const status = require("http-status");
const userService = require("../services/user.services");
const APIResponse = require("../../utils/helpers/APIResponse");
const jwt = require("jsonwebtoken");
const passport = require("passport");

class UserController {
  async createuser(req, res) {
    const data = await userService.createuser(req.body);
    if (data) {
      console.log("User Data Create API", data);
      return res
        .status(status.OK)
        .json(new APIResponse("User Created Successfully", true, 200, data));
    } else {
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json(new APIResponse("Failed to create user", false, 500));
    }
  }

  async loginuser(req, res) {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      console.log("user",err)
      if (err || !user) {
        return res.status(400).json({
          message: "Something is not right",
          user: user,
        });
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          res.send(err);
        }
        const token = jwt.sign(user.toJSON(), process.env.SECRET_KEY);
        return res.json({ user, token });
      });
    })(req, res);
  }
}

module.exports = new UserController();
