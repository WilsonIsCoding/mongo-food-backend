import mongoose, { Schema, Document } from "mongoose";

interface FoodDoc extends Document {
  vendorId: string;
  name: string;
  description: string;
  category: string;
  foodType: string;
  reallyTime: string;
  price: number;
  rating: number;
  image: [string];
}

const FoodScheme = new Schema(
  {
    vendorId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String },
    foodType: { type: String, required: true },
    reallyTime: { type: String },
    price: { type: String, required: true },
    rating: { type: Number },
    images: { type: [String] },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

const Food = mongoose.model<FoodDoc>("food", FoodScheme);

export { Food };
