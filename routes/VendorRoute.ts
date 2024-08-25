import express, { Request, Response } from "express";
import { VendorLogin } from "../controllers";
import { Authenticate } from "../middlewares";
import { GetVendorProfile } from "../controllers";

const router = express.Router();

router.post("/login", VendorLogin);

router.get("/profile", Authenticate, GetVendorProfile);

router.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Hello from vendor route" });
});

export { router as VendorRoute };
