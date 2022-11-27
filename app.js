const express = require("express");
const morgan = require("morgan");
const { globalErrorHandler } = require("./controllers/error.controller");

//routes
const { reservationsRouter } = require("./routes/reservations.routes");

const app = express();

//enable receive json
app.use(express.json());

app.use(morgan("dev"));

app.use("/api/v1/reservations", reservationsRouter);

// Global error handler
app.use(globalErrorHandler);

//catch non-existing endpoints
app.all("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: `${req.method} ${req.url} does not exist in our server`,
  });
});

module.exports = { app };
