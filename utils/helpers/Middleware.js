const mongoose = require("mongoose");
const post = mongoose.model("post");
module.exports = checkUserAccess = async (req, res, next) => {
  const userId = req.user._id;
  const resourceId = req.params.id;
  const postdata = await post.findOne({ createdBy: userId,_id:resourceId });
  if (postdata!=null) {
    return next();
  } else {
    return res
      .status(403)
      .json({ error: "You are not authorized to access this data." });
  }
};
