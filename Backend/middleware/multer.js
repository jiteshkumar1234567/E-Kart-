// import multer from "multer"

// const storage = multer.memoryStorage()

// export const singleUpload = multer({ storage }).single("profilePic")

// // ⚠️ field name MUST match frontend
// export const multipleUpload = multer({ storage }).array("images", 5)















// import multer from "multer"

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/")
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname)
//   },
// })

// // ✅ SINGLE IMAGE (user profile, avatar etc.)
// export const singleUpload = multer({
//   storage,
// }).single("image")

// // ✅ MULTIPLE IMAGES (products)
// export const multipleUpload = multer({
//   storage,
// }).array("images", 5)






















// import multer from "multer"
// import path from "path"

// // ✅ STORAGE
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/")
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname))
//   },
// })

// // ✅ FILE FILTER (OPTIONAL BUT SAFE)
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true)
//   } else {
//     cb(new Error("Only images are allowed"), false)
//   }
// }

// // ✅ SINGLE UPLOAD (PROFILE / USER)
// export const singleUpload = multer({
//   storage,
//   fileFilter,
// }).single("profilePic")

// // ✅ MULTIPLE UPLOAD (PRODUCT IMAGES)
// export const multipleUpload = multer({
//   storage,
//   fileFilter,
// }).array("images", 5)





















// import multer from "multer";
// import fs from "fs";
// import path from "path";

// // ✅ Uploads folder path
// const uploadDir = path.join(process.cwd(), "uploads");

// // ⚠️ Agar folder nahi hai to create kar do
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// // ⚡ Disk Storage (direct local storage)
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     // filename: timestamp-originalname
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// // ✅ Multiple Upload Middleware (images field from frontend)
// export const multipleUpload = multer({
//   storage,
// }).array("images", 5); // "images" = field name from frontend, max 5 files

// // ✅ Single Upload Middleware (profilePic field example)
// export const singleUpload = multer({
//   storage,
// }).single("profilePic");

















// import multer from "multer";

// const storage = multer.memoryStorage(); // ✅ Pehle jaise direct memory

// // Multiple files upload
// export const multipleUpload = multer({ storage }).array("images", 5);

// // Single file upload (profile pic etc.)
// export const singleUpload = multer({ storage }).single("profilePic");



// import multer from "multer"

// const storage = multer.memoryStorage()

// export const multipleUpload = multer({
//   storage,
// }).array("images", 5)






















// import multer from "multer"

// // 🔥 Memory storage (Cloudinary friendly)
// const storage = multer.memoryStorage()

// // ✅ Multiple images (products)
// export const multipleUpload = multer({
//   storage,
// }).array("images", 5)

// // ✅ Single image (profile pic / avatar)
// export const singleUpload = multer({
//   storage,
// }).single("profilePic")







import multer from "multer"

const storage = multer.memoryStorage()

export const multipleUpload = multer({ storage }).array("images", 5)
export const singleUpload = multer({ storage }).single("profilePic")
