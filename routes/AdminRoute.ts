import express, { Request, Response } from "express";
import { CreateVendor, GetVendors, GetVendorsByID } from "../controllers";
const router = express.Router();


router.post('/vendor', CreateVendor)

router.get('/vendor', GetVendors)

router.get('/vendor/:id', GetVendorsByID)

router.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Hello from admin route" });
});

export { router as AdminRoute };
