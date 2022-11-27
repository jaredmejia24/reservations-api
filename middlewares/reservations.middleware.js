const { Op } = require("sequelize");
const { Reservation } = require("../models/reservation.model");
const { AppError } = require("../utils/appError.utils");
const { catchAsync } = require("../utils/catchAsync.utils");

const reservationExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const reservation = await Reservation.findOne({
    where: {
      id: id,
      [Op.or]: [{ status: "pending" }, { status: "payed" }],
    },
  });

  if (!reservation) {
    return next(new AppError("Reservation Not Found", 404));
  }

  req.reservation = reservation;
  next();
});

module.exports = { reservationExist };
