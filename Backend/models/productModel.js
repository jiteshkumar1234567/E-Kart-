// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//   productName: { type: String, required: true },
//   productPrice: { type: Number, required: true },
//   productimg: [
//     {
//       url: String,
//     },
//   ],
//   category: String,
//   brand: String,
//   // add other fields as needed
// }, { timestamps: true });

// export const Product = mongoose.model("Product", productSchema);























import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },

    // productimg: [
    //   {
    //     url: String,
    //   },
    // ],
    
    productimg: [
  {
    url: String,
    public_id: String,
  },
],


    category: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    brand: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
