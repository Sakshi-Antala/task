
const mongoose = require("mongoose");

const user = mongoose.model("user");
const argon2 = require("argon2");

class UserService {
  
  static async createuser(data) {
    var users = new user(data);
    const hashedPassword = await argon2.hash(data.password);
    users.password = hashedPassword;
    return users.save();
  }
}

module.exports = UserService;
