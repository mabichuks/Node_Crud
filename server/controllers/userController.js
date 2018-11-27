import Model from "../models";
import Helpers from "../helpers/helpers";
import jwt from "jsonwebtoken";
import debug from "debug";


var deb = debug("app:app.register");

const { User } = Model;

export default class UserController {
  static register(req, res) {
    const { username, password } = req.body;
    User.findOne({ where: { username: username } }).then(user => {
      if (user) {
        return res.status(409).json({
          status: "error",
          code: 409,
          message: "Account Already Exists"
        });
      }

      var pHash = Helpers.passwordHasher(password);
      User.create({ username: username.trim().toLowerCase(), password: pHash }).then(user => {
        return res.status(201).json({
          status: 201,
          message: "User created",
          user: {
            username: user.username,
            password: user.password
          }
        });
      });
    });
  }

  static signIn(req, res) {
    const { username, password } = req.body;
    deb(req.body);
    User.findOne({
      where: { username: username.trim().toLowerCase() }
    }).then(user => {
      if (user) {
        var correctPassword = Helpers.comparePassword(password, user.password);

        if (!correctPassword) {
          return res.status(409).json({
            status: "error",
            message: "Password not correct"
          });
        }

        const token = jwt.sign(
          { username: user.username },
          "express_practice",
          {
            expiresIn: "2h"
          }
        );

        return res.status(200).json({
          status: 200,
          code: "logged in",
          token,
          user: {
            id: user.id,
            username: user.username
          }
        });
      } else {
        return res.status(409).json({
          status: "error",
          code: 409,
          message: "Username incorrect"
        });
      }
    });
  }
}
