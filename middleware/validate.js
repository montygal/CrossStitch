const validator = require('../helpers/validate');

const saveContact = (req, res, next) => {
  const validationRule = {
    theme: 'required|string',
    color: 'required|string',
    skill: 'required|email',
    style: 'required|string',
    size: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveContact
};