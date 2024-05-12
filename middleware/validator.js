const { body, param, check } = require("express-validator");

function createValidator(field, value, location) {
  let validator;
  switch (location) {
    case "body":
      validator = body(field);
      break;
    case "params":
      validator = param(field);
      break;
    case "file":
      validator = check(`file.${field}`);
      break;
  }
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return Object.entries(value).flatMap(([nestedField, nestedValue]) =>
      createValidator(`${field}.${nestedField}`, nestedValue, location)
    );
  }
  return validator.trim().escape();
}

exports.validator = (req, res, next) => {
  const bodyValidations = Object.entries(req.body).flatMap(([field, value]) =>
    createValidator(field, value, "body")
  );
  const paramValidations = Object.entries(req.params).flatMap(
    ([field, value]) => createValidator(field, value, "params")
  );
  const fileValidations = req.file
    ? Object.entries(req.file).flatMap(([field, value]) =>
        createValidator(field, value, "file")
      )
    : [];

  Promise.all(
    [...bodyValidations, ...paramValidations, ...fileValidations].map(
      (validation) => validation.run(req)
    )
  ).then(() => {
    next();
  });
};
