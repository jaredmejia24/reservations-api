const express = require("express");

//controllers
const {
  getAllReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
  payReservation,
} = require("../controllers/reservations.controller");

//middlewares
const { reservationExist } = require("../middlewares/reservations.middleware");

//validators
const {
  createReservationValidators,
  updateReservationValidators,
  paramReservationValidators,
} = require("../middlewares/validators.middleware");

const reservationsRouter = express.Router();

reservationsRouter
  .get("/", getAllReservations)
  .post("/", createReservationValidators, createReservation)
  .get("/:id", paramReservationValidators, reservationExist, getReservationById)
  .patch(
    "/:id",
    paramReservationValidators,
    reservationExist,
    updateReservationValidators,
    updateReservation
  )
  .delete(
    "/:id",
    paramReservationValidators,
    reservationExist,
    deleteReservation
  )
  .patch(
    "/pay/:id",
    paramReservationValidators,
    reservationExist,
    payReservation
  );

module.exports = { reservationsRouter };
