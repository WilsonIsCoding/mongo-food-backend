import express from "express";
import bodyParser from "body-parser";
import { AdminRoute, VendorRoute } from "./routes";
import { MONGO_URI } from "./config";
import mongoose from "mongoose";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/admin", AdminRoute);
app.use("/vendor", VendorRoute);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("DB connected");
  });

app.listen(8000, () => {
  console.clear();
  console.log("服務器正在監聽8000端口");
});
