import express, { Request, Response } from "express";
import { VendorLogin } from "../controllers";
import { Authenticate } from "../middlewares";
import multer from "multer";
import {
  GetVendorProfile,
  updateVendorProfile,
  updateVendorCoverImage,
  updateVendorService,
  AddFood,
  getFoods,
} from "../controllers";

const router = express.Router();

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + "_" + file.originalname);
  },
});

const images = multer({ storage: imageStorage }).array("images", 10);

router.post("/login", VendorLogin);

router.use(Authenticate);
router.get("/profile", GetVendorProfile);
router.patch("/profile", updateVendorProfile);
router.patch("/coverImage",images, updateVendorCoverImage);

router.patch("/service", updateVendorService);

router.post("/foods", images, AddFood);
router.get("/foods", getFoods);

router.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Hello from vendor route" });
});

export { router as VendorRoute };
