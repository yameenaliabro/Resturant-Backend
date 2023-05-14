const express = require('express');
const multer = require('multer');
const Image = require('../db/demo');
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.post('/upload-image', upload.single('image'), async(req, res) => {
  const { originalname, buffer } = req.file;

  const image = new Image({
    name: originalname,
    image: buffer
  });
 await image.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving image to database');
    } else {
      res.json({ imageUrl: `data:image/jpeg;base64,${buffer.toString('base64')}` });
    }
  });
});
module.exports = router;

