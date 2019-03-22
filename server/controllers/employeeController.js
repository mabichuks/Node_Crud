import Model from "../models";

const debug = require("debug")("app:app.employeeCOntroller");
const { Employee } = Model;
const { Company } = Model;

export default class EmployeeController {
  static addEmployee(req, res) {
    const { name, designation, companyId } = req.body;

    Employee.create({ name, designation, companyId })
      .then(employee => {
        if (!employee) {
          return res.status(500).json({
            message: "An error occured"
          });
        }

        return res.status(200).json({
          message: "successfully added",
          employee
        });
      })
      .catch(error => {
        return res.status(400).json({ error });
        console.log(error);
      });
  }

  static getAll(req, res) {
    Employee.findAll({ include: [{ model: Company }] })
      .then(result => {
        if (!result) {
          return res.status(204).json({
            message: "No content"
          });
        }
        return res.status(200).json({
          result
        });
      })
      .catch(error => {
        return res.status(400).json({
          error
        });
      });
  }

  static update(req, res) {
    const { name, designation, companyId } = req.body;

    Employee.findById(req.params.id).then(result => {
      if (!result) {
        return res.status(400).json({
          status: 400,
          message: "not found"
        });
      }

      result.update({ name, designation, companyId }).then(updatedResult => {
        return res.status(200).json({
          message: "Updated successfully",
          updatedResult
        });
      });
    });
  }

  static delete(req, res) {
    Employee.destroy({ where: { id: req.params.id } }).then(deletedStatus => {
      if (!deletedStatus) {
        return res.status(400).json({
          message: "Employee Not found"
        });
      }

      return res.status(200).json({
        message: "Successfully deleted",
        deleted: deletedStatus
      });
    });
  }

  static getSingle(req, res) {
    Employee.findById(req.params.id, { include: [{ model: Company }] }).then(
      result => {
        if (!result) {
          return res.status(400).json({
            message: "Not found"
          });
        }

        return res.status(200).json({
          result
        });
      }
    );
  }

  static getByCompany(req, res) {
    const companyId = req.params.id;

    Employee.findAll({
      where: { companyId: companyId },
      include: [{ model: Company }]
    })
      .then(result => {
        if (!result) {
          return res.status(204).json({
            message: "No Content"
          });
        }
        return res.status(200).json({
          message: "success",
          result
        });
      })
      .catch(error => {
        return res.status(409).json({
          error
        });
      });
  }
}
