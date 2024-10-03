const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/userroutes");
const canteenroutes = require("./routes/canteenroutes");
const itemroutes = require("./routes/itemroutes");
const orderingRouter = require("./routes/orderingRoutes");
const cookieParser = require("cookie-parser");
const billRoutes = require('./routes/billRoutes');

app.use("/api/v1/bills", billRoutes);
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.enable("trust proxy");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/api", (req, res) => {
  if (req.body.username === "Akash") {
    res.json({ message: "You are a superuser" });
  } else {
    res.json({ message: "This is your API response" });
  }
  console.log(req.cookies.jwt);
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/canteens", canteenroutes);
app.use("/api/v1/items", itemroutes);
app.use("/api/v1/orders", orderingRouter);
app.use("/api/v1/bills", billRoutes);
// app.use("/api/v1/timetable");

module.exports = app;
