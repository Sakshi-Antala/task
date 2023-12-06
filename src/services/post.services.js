const mongoose = require("mongoose");

const post = mongoose.model("post");

class PostService {
  static async createpost(user, data) {
    data.createdBy = user._id;
    return post.create(data);
  }

  static async getpost(user) {
    return post.find({ createdBy: user._id }).populate({ path: "createdBy" });
  }

  static async updatepost(id, data) {
    return post.findByIdAndUpdate(id, data);
  }

  static async deletepost(id) {
    return post.findByIdAndDelete(id);
  }

  static async managepoststatus(id, querydata) {
    return post.findByIdAndUpdate(id, querydata);
  }

  static async getpostcounter() {
    return post.aggregate([
      {
        $group: {
          _id: "$isActive",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          status: {
            $cond: {
              if: { $eq: ["$_id", true] },
              then: "active",
              else: "inactive",
            },
          },
          count: 1,
          _id: 0,
        },
      },
    ]);
  }
}

module.exports = PostService;
