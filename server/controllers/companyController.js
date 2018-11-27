import Model from "../models";

const debug = require("debug")("app:app.CompanyController");
const { Company } = Model;

export default class CompanyController {
  static addCompany(req, res) {
    const { name } = req.body;

    Company.create({ name })
      .then(company => {
        res.status(200).json({ company });
        console.log(company);
      })
      .catch(error => {
        res.status(400).json({ error });
        console.log(error);
      });
  }

   static async getAll(req, res) {
    try {
      var result = await Company.findAll();

      return res.status(200).json({
        result,
        user: req.username
      });
      
    } catch (error) {
      return res.status(400).json({
        error: error
      });
    }
    
  }

  static updateCompany(req, res) {

    const { name } = req.body;

    Company.findById(req.params.id)
      .then(result => {
        if(!result) {
         return res.status(400).json({
            status: 400,
            message: 'not found'
          });
        }

        result.update({name})
          .then(updatedResult => {
            debug(updatedResult);
           return res.status(200).json({
              message: 'Updated successfully',
              updatedCompany: {
                name: updatedResult.name
              }
            });
          });
      })
  }

 static deleteCompany(req, res) {
   Company.destroy({where: {id: req.params.id}})
    .then(deletedStatus => {
      debug(deletedStatus);
      if(!deletedStatus) {
        return res.status(400).json({
          message: 'Not found'
        });
      }

      return res.status(200).json({
        message: 'Successfully deleted'
      });
    });
 }

 static getSingle(req, res) {
   Company.findById(req.params.id)
    .then(company => {
      if(!company) {
        return res.status(400).json({
          message: 'Not found'
        });
      }

      return res.status(200).json({
        company
      });
    });
 }
}
