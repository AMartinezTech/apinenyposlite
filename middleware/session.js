/**
 * =================================================================
 * SESSION CONTROLLER
 * =================================================================
 * @author AMartínezDev, I.E.R.L
 * @copyright Copyright (c) 2021-2030
 * @license http://opensource.org/licenses/
 * @version $Revision: 1
 * @link http://amartinezdev.com/nenypos/api
 * */
//Get the errors helper
const { handleHttpError } = require("../utils/handleError");

//Get the token helper
const { verifyToken } = require("../utils/handleJwt");

//Get the model instance
const { userModel } = require("../models");

const checkAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, "NEED_AUTHORIZATION", 409);
      return;
    }
    const token = req.headers.authorization.split(" ").pop();
    const tokenData = await verifyToken(token);

    if (!tokenData) {
      handleHttpError(res, "NEED_TOKEN", 409);
      return;
    }
    const { id } = tokenData;
    const user = await userModel.findOne({
      where: id,
    });
    req.user = user;
    next();
  } catch (e) {
    handleHttpError(res, e);
  }
};

module.exports = checkAuth;
