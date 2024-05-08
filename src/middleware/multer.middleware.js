import multer from "multer";

multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/public/temp");
  },
  filename: function (req, file, res) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
