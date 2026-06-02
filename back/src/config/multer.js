const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads');
  },

  filename: (req, file, cb) => {
    const extensao = path.extname(file.originalname);

    cb(null, `${Date.now()}${extensao}`);
  },
});

module.exports = multer({ storage });
