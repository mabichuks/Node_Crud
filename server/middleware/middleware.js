import jwt from "jsonwebtoken";
import Model from '../models';
import lodash from 'lodash';


const {Company} = Model;
var debug = require("debug")("app:app.middleware");

export default class Middleware {
  static authorize(req, res, next) {
    const token = 
    req.headers.authorization.slice(7)  || req.body.token || req.query.token || req.get("Authorization").slice(7);
      debug(JSON.stringify(token));
      if(!token) {
        return res.status(404).json({
          status: "error",
          code: 404,
          message: "Not Authorized"
        });
      }

    jwt.verify(token, "express_practice", (err, decoded) => {
      if (err) {
        return res.status(404).json({
          status: "error",
          code: 404,
          message: "Not Authorized"
        });
      }

      req.username = decoded.username;
      return next();
    });
  }

  static passwordValidator(req, res, next) {
    const errors = {};
    const {password, confirmPassword} = req.body;

    if(!password || ! confirmPassword) {
      errors.emptyPassword = 'Password Cannot be empty';
    }

    if(password && password.length < 6) {
      errors.passwordLength = 'Password length must be greater than 6'
    }

    if(password.localeCompare(confirmPassword)) {
      errors.passwordMatch = 'Passwords do not match';
    }

    if(!lodash.isEmpty(errors)) {
      res.status(409).json({
        errors
      });
    }
    next();
  }

  static validateCompany(req, res, next) {
    const {name} = req.body;

    Company.findOne({where: {name: name}})
      .then(result => {
        if(result) {
          return res.status(409).json({
            message: 'Company already exists'
          });
        }

        next();
      })
  }

}
