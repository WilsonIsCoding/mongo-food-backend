import express, { Request, Response } from "express";
import { CreateVendor, GetAdmins, GetAdminByID } from "../controllers";
const router = express.Router();


router.post('/vendor', CreateVendor)

router.get('/vendor', GetAdmins)

router.get('/vendor/:id', GetAdminByID)

router.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Hello from admin route" });
});

export { router as AdminRoute };
