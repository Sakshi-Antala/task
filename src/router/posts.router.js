const express = require("express");
const router = express.Router();
const status = require("http-status");
const APIResponse = require("../../utils/helpers/APIResponse");
const postController = require("../controller/post.controller");
const { asyncHandler } = require("../../utils/helpers");
const passport = require("passport");
let Joi = require("joi");
const checkUserAccess = require("../../utils/helpers/Middleware")

router.post(
  "",
  passport.authenticate("jwt", { session: false }),
  postcreateValidate,
  asyncHandler(postController.createpost)
);

router.get("/",passport.authenticate("jwt", { session: false }), asyncHandler(postController.getpost));

router.put("/:id", passport.authenticate("jwt", { session: false }),checkUserAccess,asyncHandler(postController.updatepost));

router.delete("/:id",passport.authenticate("jwt", { session: false }),checkUserAccess, asyncHandler(postController.deletepost));

router.get("/status/:id",passport.authenticate("jwt", { session: false }), checkUserAccess,asyncHandler(postController.managepoststatus));

router.get("/getpostcounter", asyncHandler(postController.getpostcounter));

var postJoiValidation = Joi.object()
  .keys({
    title: Joi.string().required().error(new Error("Title Required")),
    body: Joi.string().required().error(new Error("Post Body Required")),
  })
  .unknown();

function postcreateValidate(req, res, next) {
  const Data = req.body;
  const { error, result } = postJoiValidation.validate(Data);
  if (error) {
    return res
      .status(status.BAD_REQUEST)
      .json(new APIResponse(null, error.message, true, httpStatus.BAD_REQUEST));
  } else {
    return next();
  }
}

module.exports = router;
