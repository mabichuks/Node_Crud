import CompanyController from "../controllers/companyController";
import UserController from '../controllers/userController';
import EmployeeController from '../controllers/employeeController';
import Middleware from '../middleware/middleware';
import express from "express";

var router = express.Router();
var debug = require("debug")("app");
/* Auth Routes. */

router.post('/auth/register', Middleware.passwordValidator, UserController.register);
router.post('/auth/signIn', UserController.signIn)

/* Company Routes */

router.get("/company", Middleware.authorize, CompanyController.getAll);
router.post('/company/add', Middleware.authorize, Middleware.validateCompany, CompanyController.addCompany);
router.delete('/company/delete/:id', Middleware.authorize, CompanyController.deleteCompany);
router.put('/company/update/:id', Middleware.authorize, CompanyController.updateCompany);
router.get('/company/:id', Middleware.authorize, CompanyController.getSingle);

/* Employee Routes */

router.get('/employee', Middleware.authorize, EmployeeController.getAll);
router.post('/employee/add', Middleware.authorize, EmployeeController.addEmployee);
router.delete('/employee/delete/:id', Middleware.authorize, EmployeeController.delete);
router.put('/employee/update/:id', Middleware.authorize, EmployeeController.update);
router.get('/employee/:id', Middleware.authorize, EmployeeController.getSingle);
router.get('/employee/company/:id', Middleware.authorize, EmployeeController.getByCompany);


export default router;
