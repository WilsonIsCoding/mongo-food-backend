import { Request, Response } from "express";
import { VendorLoginInput, EditVendorInputs } from "../dto";
import { GenerateSignature, ValidatePassword } from "../utils";
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

export const updateVendorService = async (req: Request, res: Response) => {
  const { serviceAvailable } = req.body;
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
