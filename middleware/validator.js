const { body } = require("express-validator");

function createValidator(field, value) {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return Object.entries(value).flatMap(([nestedField, nestedValue]) =>
      createValidator(`${field}.${nestedField}`, nestedValue)
    );
  }
  return body(field).trim().escape();
}

exports.validator = (req, res, next) => {
  const validations = Object.entries(req.body).flatMap(([field, value]) =>
    createValidator(field, value)
  );

  Promise.all(validations.map((validation) => validation.run(req))).then(() => {
    next();
  });
};
