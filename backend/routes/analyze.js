const express = require("express");
const multer = require("multer");

const router = express.Router();

// Configure where uploaded files will be stored
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Test upload route
router.post("/", upload.single("report"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  res.json({
    success: true,
    message: "File uploaded successfully!",
    filename: req.file.filename,
  });
});

module.exports = router;