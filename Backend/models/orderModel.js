// // import mongoose from "mongoose"

// // const orderSchema = new mongoose.Schema(
// //   {
// //     user: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //       required: true,
// //     },

// //     items: [
// //       {
// //         product: {
// //           type: mongoose.Schema.Types.ObjectId,
// //           ref: "Product",
// //         },
// //         quantity: Number,
// //         price: Number,
// //       },
// //     ],

// //     totalAmount: {
// //       type: Number,
// //       required: true,
// //     },

// //     paymentStatus: {
// //       type: String,
// //       enum: ["pending", "paid", "failed"],
// //       default: "pending",
// //     },

// //     paymentMethod: {
// //       type: String,
// //       default: "COD",
// //     },
// //   },
// //   { timestamps: true }
// // )

// // export const Order = mongoose.model("Order", orderSchema)










// import mongoose from "mongoose";

// // const orderSchema = new mongoose.Schema(
// //   {
// //     user: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //       required: true,
// //     },

// //     // 🔥 Admin jiska product hai
// //     admin: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //       required: true,
// //     },

// //     items: [
// //       {
// //         product: {
// //           type: mongoose.Schema.Types.ObjectId,
// //           ref: "Product",
// //         },
// //         quantity: {
// //           type: Number,
// //           required: true,
// //         },
// //         price: {
// //           type: Number,
// //           required: true,
// //         },
// //       },
// //     ],

// //     // ✅ 🔥 ADDRESS ADD (ROOT CAUSE FIX)
// //     address: {
// //       fullName: { type: String, required: true },
// //       phone: { type: String, required: true },
// //       street: { type: String, required: true },
// //       city: { type: String, required: true },
// //       state: { type: String, required: true },
// //       pincode: { type: String, required: true },
// //     },

// //     totalAmount: {
// //       type: Number,
// //       required: true,
// //     },

// //     paymentStatus: {
// //       type: String,
// //       enum: ["pending", "paid", "failed"],
// //       default: "pending",
// //     },

// //     paymentMethod: {
// //       type: String,
// //       default: "COD",
// //     },
// //   },
// //   { timestamps: true }
// // );


// const orderSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     admin: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     items: [
//       {
//         product: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Product",
//         },
//         quantity: Number,
//         price: Number,
//       },
//     ],

//     address: {
//       fullName: String,
//       phone: String,
//       street: String,
//       city: String,
//       state: String,
//       pincode: String,
//     },

//     totalAmount: {
//       type: Number,
//       required: true,
//     },

//     paymentStatus: {
//       type: String,
//       enum: ["pending", "paid", "failed"],
//       default: "pending",
//     },

//     paymentMethod: {
//       type: String,
//       default: "COD",
//     },
//   },
//   { timestamps: true }
// );



// export const Order = mongoose.model("Order", orderSchema);
















































// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     admin: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     items: [
//       {
//         product: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Product",
//           required: true,
//         },
//         quantity: Number,
//         price: Number,
//       },
//     ],
//     address: {
//       fullName: String,
//       phone: String,
//       street: String,
//       city: String,
//       state: String,
//       pincode: String,
//     },
//     totalAmount: Number,
//     paymentMethod: String,
//     paymentStatus: String,
//   },
//   { timestamps: true }
// );

// export const Order = mongoose.model("Order", orderSchema);
























// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     admin: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     items: [
//       {
//         product: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Product",
//         },
//         quantity: Number,
//         price: Number,
//       },
//     ],

//     address: {
//       fullName: String,
//       phone: String,
//       street: String,
//       city: String,
//       state: String,
//       pincode: String,
//     },

//     totalAmount: {
//       type: Number,
//       required: true,
//     },

//     paymentStatus: {
//       type: String,
//       enum: ["pending", "paid", "shipped", "delivered"],
//       default: "pending",
//     },

//     paymentMethod: {
//       type: String,
//       default: "COD",
//     },
//   },
//   { timestamps: true }
// );

// export const Order = mongoose.model("Order", orderSchema);






























// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     admin: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     items: [
//       {
//         product: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Product",
//         },
//         quantity: Number,
//         price: Number,
//       },
//     ],
//     address: {
//       fullName: String,
//       phone: String,
//       street: String,
//       city: String,
//       state: String,
//       pincode: String,
//     },
//     totalAmount: {
//       type: Number,
//       required: true,
//     },
//     paymentStatus: {
//       type: String,
//       enum: ["pending", "paid", "shipped", "delivered"],
//       default: "pending",
//     },
//     paymentMethod: {
//       type: String,
//       default: "COD",
//     },
//   },
//   { timestamps: true }
// );

// export const Order = mongoose.model("Order", orderSchema);

























import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        price: Number,
      },
    ],
    address: {
      fullName: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      pincode: String,
    },
    totalAmount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered"],
      default: "pending",
    },
    paymentMethod: { type: String, default: "COD" },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
