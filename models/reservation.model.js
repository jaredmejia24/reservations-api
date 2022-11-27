const { db, DataTypes } = require("../utils/database.utils");

const Reservation = db.define(
  "reservation",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    roomDetails: {
      type: DataTypes.STRING,
      field: "room_details",
      allowNull: false,
    },
    stayDays: {
      type: DataTypes.INTEGER,
      field: "stay_days",
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      field: "payment_method",
      allowNull: false,
    },
    amountPaid: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    billingInformation: {
      type: DataTypes.STRING,
      field: "billing_information",
      allowNull: false,
    },
    clientId: {
      type: DataTypes.INTEGER,
      field: "client_id",
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["pending", "payed", "deleted"],
      defaultValue: "pending",
      allowNull: false,
    },
  },
  { underscored: true, freezeTableName: true }
);

module.exports = { Reservation };
