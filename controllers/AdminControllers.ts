import { Request, Response } from "express";
import { CreateVendorInput } from "../dto";
import { Vendor } from "../models";

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

  const createVendor = await Vendor.create({
    name: name,
  });

  return res.json(createVendor);
};

export const GetAdmins = async (req: Request, res: Response) => {
  return res.json({ message: "Hello from admin route" });
};

export const GetAdminByID = async (req: Request, res: Response) => {
  return res.json({ message: req.params.id });
};
