"use strict";

var _bookController = require("../controllers/bookController");

var _bookController2 = _interopRequireDefault(_bookController);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var debug = require("debug")("app");

/* GET home page. */
router.get("/books", _bookController2.default);