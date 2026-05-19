import multer from "multer";
import path from "path";
import fs from "fs";

const uploadPath = path.join(process.cwd(), "public/uploads");

// CREATE FOLDER IF NOT EXISTS
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();

    cb(
      null,
      uniqueSuffix + "-" + file.originalname
    );
  },
});

export const upload = multer({
  storage,

  fileFilter(req, file, cb) {
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});