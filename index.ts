import express from "express";
import bodyParser from "body-parser";
import { AdminRoute, VendorRoute } from "./routes";
import { MONGO_URI } from "./config";
import mongoose from "mongoose";
import path from "path";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/admin", AdminRoute);
app.use("/vendor", VendorRoute);

// app.use('/',(req,res)=>{
//   return res.json({message:'Hello World'})
// })

mongoose.connect(MONGO_URI).then(() => {
  console.log("DB connected");
});

app.listen(8000, () => {
  console.clear();
  console.log("服務器正在監聽8000端口");
});
