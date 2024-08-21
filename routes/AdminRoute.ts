import express, { Request, Response } from "express";
import { CreateAdmin, GetAdmins, GetAdminByID } from "../controllers";
const router = express.Router();


router.post('/vandor', CreateAdmin)

router.get('/vandor', GetAdmins)

router.get('/vandor/:id', GetAdminByID)

router.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Hello from admin route" });
});

export { router as AdminRoute };
