const { Op } = require("sequelize");
const { Reservation } = require("../models/reservation.model");
const { AppError } = require("../utils/appError.utils");
const { catchAsync } = require("../utils/catchAsync.utils");

const getAllReservations = catchAsync(async (req, res) => {
  //get all reservations that has status pending or payed
  const reservations = await Reservation.findAll({
    where: { [Op.or]: [{ status: "pending" }, { status: "payed" }] },
  });

  res.status(200).json({
    status: "success",
    data: {
      reservations,
    },
  });
});

const getReservationById = catchAsync(async (req, res) => {
  const { reservation } = req;

  res.status(200).json({
    status: "success",
    data: {
      reservation,
    },
  });
});

const createReservation = catchAsync(async (req, res) => {
  const reservationData = req.body;

  //if status is sended eliminate preperty
  reservationData.status = undefined;

  const newReservation = await Reservation.create(reservationData);

  res.status(201).json({
    status: "success",
    data: {
      newReservation,
    },
  });
});

const updateReservation = catchAsync(async (req, res) => {
  const reservationData = req.body;

  //if status is sended eliminate preperty
  reservationData.status = undefined;

  // get reservation from the id - reseravationExist
  const { reservation } = req;

  await reservation.update(reservationData);

  res.status(200).json({
    status: "success",
    data: {
      reservation,
    },
  });
});

const deleteReservation = catchAsync(async (req, res) => {
  // get reservation from the id - reseravationExist
  const { reservation } = req;

  await reservation.update({ status: "deleted" });

  res.status(204).json({});
});

const payReservation = catchAsync(async (req, res, next) => {
  const { reservation } = req;

  if (reservation.status === "payed") {
    return next(new AppError("Reservation already payed", 409));
  }

  await reservation.update({ status: "payed" });

  res.status(200).json({
    status: "success",
    data: {
      reservation,
    },
  });
});

module.exports = {
  getAllReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
  payReservation,
};
