import express, { Request, Response } from "express";
import { VendorLogin } from "../controllers";

const router = express.Router();

router.post("/login", VendorLogin);

router.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Hello from vendor route" });
});

export { router as VendorRoute };
