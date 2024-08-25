import express, { Request, Response } from "express";
import { VendorLogin } from "../controllers";
import { Authenticate } from "../middlewares";
import {
  GetVendorProfile,
  updateVendorProfile,
  updateVendorService,
} from "../controllers";

const router = express.Router();

router.post("/login", VendorLogin);

router.use(Authenticate);
router.get("/profile", GetVendorProfile);
router.patch("/profile", updateVendorProfile);
router.patch("/service", updateVendorService);

router.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Hello from vendor route" });
});

export { router as VendorRoute };
