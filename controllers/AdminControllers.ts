import { Request, Response } from "express";
import { CreateVendorInput, VendorLoginInput } from "../dto";
import { Vendor } from "../models";
import { GeneratePassword, GenerateSalt, ValidatePassword } from "../utils/PasswordUnility";


export const findVendor = async (email: string | null, id: string | null) => {
  if (email) {
    return await Vendor.findOne({ email: email });
  } else {
    return await Vendor.findById(id);
  }
};

export const CreateVendor = async (req: Request, res: Response) => {
  const {
    name,
    address,
    pincode,
    foodType,
    ownerName,
    phone,
    email,
    password,
  } = <CreateVendorInput>req.body;

  const existingVendor = await findVendor(email, null);

  if (existingVendor) {
    return res.json({ message: "Vendor already exists" });
  }

  // Generate salt
  const salt = await GenerateSalt();

  // Generate password
  const passwordHash = await GeneratePassword(password, salt);

  const createVendor = await Vendor.create({
    name: name,
    address: address,
    pincode: pincode,
    foodType: foodType,
    ownerName: ownerName,
    phone: phone,
    email: email,
    password: passwordHash,
    salt: salt,
    serviceAvailable: true,
    coverImages: [],
    rating: 0,
  });

  return res.json(createVendor);
};

export const GetVendors = async (req: Request, res: Response) => {
  const vendors = await Vendor.find();
  if (vendors !== null) {
    return res.json({ vendors });
  }
  return res.json({ message: "vendors data is not available" });
};

export const GetVendorsByID = async (req: Request, res: Response) => {
  const vandor = await findVendor(null, req.params.id);
  if (vandor) {
    return res.json({ vandor });
  }
  return res.json({ message: "Vendor not found" });
};
