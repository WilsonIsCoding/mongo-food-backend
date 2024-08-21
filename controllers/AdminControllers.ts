import { Request, Response } from "express";
import { CreateVandorInput } from "../dto";

export const CreateAdmin = async (req: Request, res: Response) => {
  const {name, ownerName, foodType, pincode, address, phone, email, password} = <CreateVandorInput>req.body;

  const createVandor = await Vandor.create({name, ownerName, foodType, pincode, address, phone, email, password});
  
  return res.json({name, ownerName, foodType, pincode, address, phone, email, password});

};

export const GetAdmins = async (req: Request, res: Response) => {
  return res.json({ message: "Hello from admin route" });
};

export const GetAdminByID = async (req: Request, res: Response) => {
  return res.json({ message: req.params.id });
};