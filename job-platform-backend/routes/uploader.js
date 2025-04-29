const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: "business_licenses",
    allowed_formats: ["jpg", "jpeg", "png", "pdf"],
    public_id: Date.now() + "-" + file.originalname.split('.')[0],
  }),
});


if (!storage) {
  throw new Error("Storage không khởi tạo được");
}

const upload = multer({ storage });

module.exports = upload;
