const express = require("express");
const router = express.Router();
const status = require('http-status');
const APIResponse = require("../../utils/helpers/APIResponse");
const userController = require("../controller/user.controller");
const { asyncHandler } = require("../../utils/helpers");

let Joi = require("joi");

router.post("", usercreateValidate, asyncHandler(userController.createuser));

router.post("/login", asyncHandler(userController.loginuser));



var userJoiValidation = Joi.object()
  .keys({
    name: Joi.string()
      .required()
      .error(new Error("Name Required")),
      email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .error(new Error("Valid Email Required")),
    mobileNumber: Joi.string()
      .required()
      .length(10).pattern(/^[0-9]+$/)
      .error(new Error("Valid mobileNumber required")),
    password: Joi.string()
      .required()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)
      .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*]{8,}$"))
      .error(new Error("Password is Invalid")),
  })
  .unknown();


function usercreateValidate(req, res, next) {
  const Data = req.body;
  const { error, result } = userJoiValidation.validate(Data);
  if (error) {
    return res
      .status(status.BAD_REQUEST)
      .json(new APIResponse(null, error.message, true, status.BAD_REQUEST));
  } else {
    return next();
  }
}


module.exports = router;
