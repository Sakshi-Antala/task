
const status = require('http-status');
const APIResponse = require('./APIResponse');

const asyncHandler = (fn) => function asyncUtilWrap(...args) {
  const fnReturn = fn(...args);
  const res = args[1];
  return Promise.resolve(fnReturn).catch((error) => res.status(status.INTERNAL_SERVER_ERROR).json(new APIResponse('Error while performing operation', true, 500, error.message)));
};

module.exports = {
  asyncHandler,
};
