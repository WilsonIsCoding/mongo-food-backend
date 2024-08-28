import { Request, Response } from "express";
import { VendorLoginInput, EditVendorInputs, CreateFoodInputs } from "../dto";
import { GenerateSignature, ValidatePassword } from "../utils";
import { Food } from "../models";
import { findVendor } from "./AdminControllers";

export const VendorLogin = async (req: Request, res: Response) => {
  const { email, password } = <VendorLoginInput>req.body;

  const existingUser = await findVendor(email, "");

  if (existingUser !== null) {
    const validation = await ValidatePassword(
      password,
      existingUser.password,
      existingUser.salt
    );
    if (validation) {
      const signature = await GenerateSignature({
        _id: existingUser.id,
        email: existingUser.email,
        foodType: existingUser.foodType,
        name: existingUser.name,
      });
      return res.json({ signature });
    }
  }

  return res.json({ message: "Vendor not found" });
};

export const GetVendorProfile = async (req: Request, res: Response) => {
  const user = req.user;
  if (user) {
    const existingVendor = await findVendor("", user._id);
    return res.json({ existingVendor });
  }
  return res.json({ message: "Vendor not found" });
};

export const updateVendorProfile = async (req: Request, res: Response) => {
  const { name, phone, address, foodType } = req.body;
  const user = req.user;
  if (user) {
    const existingVendor = await findVendor("", user._id);
    if (existingVendor) {
      existingVendor.name = name;
      existingVendor.phone = phone;
      existingVendor.address = address;
      existingVendor.foodType = foodType;
      const updatedVendor = await existingVendor.save();
      return res.json({ updatedVendor });
    }
    return res.json({ message: "Vendor not found" });
  }
};

export const updateVendorCoverImage = async (req: Request, res: Response) => {
  const user = req.user;
  if (user) {
    const existingVendor = await findVendor("", user._id);

    if (existingVendor) {
      const file = req.files as [Express.Multer.File];
      const images = file.map((file: Express.Multer.File) => file.filename);

      existingVendor.coverImages.push(...images);
      const updatedVendor = await existingVendor.save();
      return res.json({ updatedVendor });
    }
    return res.json({ message: "Something went wrong with the vendor" });
  }
};

export const updateVendorService = async (req: Request, res: Response) => {
  const user = req.user;
  if (user) {
    const existingVendor = await findVendor("", user._id);
    if (existingVendor) {
      existingVendor.serviceAvailable = !existingVendor.serviceAvailable;
      const updatedVendor = await existingVendor.save();
      return res.json({ updatedVendor });
    }
    return res.json({ message: "Vendor not found" });
  }
};

export const AddFood = async (req: Request, res: Response) => {
  const user = req.user;
  if (user) {
    const { name, description, category, foodType, readyTime, price } = <
      CreateFoodInputs
    >req.body;

    const existingVendor = await findVendor("", user._id);

    if (existingVendor) {
      const file = req.files as [Express.Multer.File];
      const images = file.map((file: Express.Multer.File) => file.filename);

      const createFood = await Food.create({
        vendorId: user._id,
        name: name,
        description: description,
        category: category,
        foodType: foodType,
        images: images,
        readyTime: readyTime,
        price: price,
        rating: 0,
      });

      existingVendor.foods.push(createFood);
      const updatedVendor = await existingVendor.save();
      return res.json({ updatedVendor });
    }
    return res.json({ message: "Something went wrong with the food" });
  }
};

export const getFoods = async (req: Request, res: Response) => {
  const user = req.user;
  if (user) {
    const existingVendor = await Food.find({ vendorId: user._id });

    if (existingVendor) {
      return res.json(existingVendor);
    }
    return res.json({ message: "Something went wrong with the food" });
  }
};
