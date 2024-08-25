import { findVendor } from "./AdminControllers";
import { Request, Response } from "express";
import { CreateVendorInput, VendorLoginInput } from "../dto";
import { ValidatePassword } from "../utils";

export const VendorLogin = async (
  req: Request,
  res: Response,
) => {
  const { email, password } = <VendorLoginInput>req.body;

  const existingUser = await findVendor(email, '');

  if (existingUser !== null) {
    const validation = await ValidatePassword(
      password,
      existingUser.password,
      existingUser.salt
    );
    if (validation) {
      return res.json({ message: validation });
    }
  }

  return res.json({ message: "Vendor not found" });
};
