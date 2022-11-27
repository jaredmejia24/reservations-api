const { body, validationResult, param } = require("express-validator");

// Utils
const { AppError } = require("../utils/appError.utils");

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // [{ ..., msg }] -> [msg, msg, ...] -> 'msg. msg. msg. msg'
    const errorMessages = errors.array().map((err) => err.msg);

    const message = errorMessages.join(". ");

    return next(new AppError(message, 400));
  }

  next();
};

const createReservationValidators = [
  body("roomDetails")
    .exists({ checkFalsy: true })
    .withMessage("roomDetails is missing")
    .isString()
    .withMessage("roomDetails must be a string")
    .notEmpty()
    .withMessage("roomDetails cannot be empty")
    .isLength({ min: 10 })
    .withMessage("roomDetails must be at least 10 characters"),
  body("stayDays")
    .exists({ checkFalsy: true })
    .withMessage("stayDays is missing")
    .isInt({ min: 1 })
    .withMessage("stayDays must be a number greater than 0")
    .notEmpty()
    .withMessage("stayDays cannot be empty"),
  body("paymentMethod")
    .exists({ checkFalsy: true })
    .withMessage("paymentMethod is missing")
    .isString()
    .withMessage("paymentMethod must be a string")
    .notEmpty()
    .withMessage("paymentMethod cannot be empty"),
  body("amountPaid")
    .exists({ checkFalsy: true })
    .withMessage("amountPaid is missing")
    .isNumeric()
    .withMessage("amountPaid must be a number")
    .notEmpty()
    .withMessage("amountPaid cannot be empty"),
  body("billingInformation")
    .exists({ checkFalsy: true })
    .withMessage("billingInformation is missing")
    .isString()
    .withMessage("billingInformation must be a string")
    .notEmpty()
    .withMessage("billingInformation cannot be empty")
    .isLength({ min: 10 })
    .withMessage("billingInformation must be at least 10 characters"),
  body("clientId")
    .exists({ checkFalsy: true })
    .withMessage("clientId is missing")
    .isInt({ min: 1 })
    .withMessage("clientId must be a number greater than 1")
    .notEmpty()
    .withMessage("clientId cannot be empty"),
  checkValidations,
];

const paramReservationValidators = [
  param("id")
    .exists()
    .toInt()
    .isInt({ min: 1 })
    .withMessage("Id param must be a number greater than 0"),
  checkValidations,
];

const updateReservationValidators = [
  body("roomDetails")
    .isString()
    .withMessage("roomDetails must be a string")
    .notEmpty()
    .withMessage("roomDetails cannot be empty")
    .isLength({ min: 10 })
    .withMessage("roomDetails must be at least 10 characters")
    .optional(),
  body("stayDays")
    .isInt({ min: 1 })
    .withMessage("stayDays must be a number greater than 0")
    .notEmpty()
    .withMessage("stayDays cannot be empty")
    .optional(),
  body("paymentMethod")
    .isString()
    .withMessage("paymentMethod must be a string")
    .notEmpty()
    .withMessage("paymentMethod cannot be empty")
    .optional(),
  body("amountPaid")
    .isNumeric()
    .withMessage("amountPaid must be a number")
    .notEmpty()
    .withMessage("amountPaid cannot be empty")
    .optional(),
  body("billingInformation")
    .isString()
    .withMessage("billingInformation must be a string")
    .notEmpty()
    .withMessage("billingInformation cannot be empty")
    .isLength({ min: 10 })
    .withMessage("billingInformation must be at least 10 characters")
    .optional(),
  body("clientId")
    .isInt({ min: 1 })
    .withMessage("clientId must be a number greater than 1")
    .notEmpty()
    .withMessage("clientId cannot be empty")
    .optional(),
  checkValidations,
];

module.exports = {
  createReservationValidators,
  updateReservationValidators,
  paramReservationValidators,
};
