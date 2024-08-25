import { Request, Response } from "express";
import { VendorLoginInput } from "../dto";
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
