import { Product } from "../models/productModel.js"
// import cloudinary from "../Utils/Cloudinary.js"
import getDataUri from "../Utils/dataUri.js"


export const addProduct = async (req, res) => {
  try {
    console.log("BODY:", req.body)
    console.log("FILES:", req.files)

    const {
      productName,
      productDesc,
      productPrice,
      category,
      brand
    } = req.body || {}

    const userId = req.id

    if (!productName || !productDesc || !productPrice || !category || !brand) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required"
      })
    }

    let productimg = []

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const fileUri = getDataUri(file)

        const result = await cloudinary.uploader.upload(
          fileUri.content,
          { folder: "mern_product" }
        )

        productimg.push({
          url: result.secure_url,
          public_id: result.public_id
        })
      }
    }

    const newProduct = await Product.create({
      userId,
      productName,
      productDesc,
      productPrice,
      category,
      brand,
      productimg
    })

    return res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      product: newProduct
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find()

    return res.status(200).json({
      success: true,
      products,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


export const deleteProduct = async (req, res) => {
  try {
    const { productsId } = req.params; // ✅ match route param
    const product = await Product.findById(productsId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // delete images from Cloudinary
    if (product.productimg && product.productimg.length > 0) {
      for (let img of product.productimg) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    // delete product from MongoDB
    await Product.findByIdAndDelete(productsId);

    return res.status(200).json({
      success: true,
      message: "Product Deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


 export const updateProduct = async (req, res) => {
  console.log("BODY:", req.body);
console.log("FILES:", req.files);

  try {
    const { productsId } = req.params; // route me :productsId hai
    const userId = req.id;

    // multer se body aur files dono aayenge
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    // multipart form me sab fields text ke form me aayenge, isliye parse kar lo
    let { productName, productDesc, productPrice, category, brand, existingImage } = req.body;

    // Agar price number me hai to parse kar lo
    productPrice = productPrice ? Number(productPrice) : undefined;

    const product = await Product.findById(productsId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let updatedImages = [];

    // Keep selected old images
    if (existingImage) {
      let keepIds = [];
      try {
        keepIds = JSON.parse(existingImage);
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: "Invalid existingImage data",
        });
      }

      const removeImages = product.productimg.filter(
        (img) => !keepIds.includes(img.public_id)
      );
      for (const img of removeImages) {
        await cloudinary.uploader.destroy(img.public_id);
      }

      updatedImages = product.productimg.filter((img) =>
        keepIds.includes(img.public_id)
      );
    }

    // Upload new images if any
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const fileUri = getDataUri(file);
        const result = await cloudinary.uploader.upload(fileUri.content, {
          folder: "mern_product",
        });
        updatedImages.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    // Update product
    product.productName = productName || product.productName;
    product.productDesc = productDesc || product.productDesc;
    product.productPrice = productPrice || product.productPrice;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.productimg = updatedImages.length > 0 ? updatedImages : product.productimg;

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// 🔹 GET SINGLE PRODUCT BY ID


export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("createdBy", "firstName lastName email");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
