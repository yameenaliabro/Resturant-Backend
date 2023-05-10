let express = require("express")
let product = express.Router()
let multer = require("multer")
const upload = multer({ dest: 'uploads/' })
const path = require("path")
const fs = require("fs")
const Product = require("../db/Product")
const { dleteproduct, getallproduct, UpdatedProduct } = require("../controlles/Product")
const verifyToken = require("../middleware/middleware")
product.get("/allproduct", getallproduct)
product.post("/add/product", upload.single("thumbnail"), async (req, res) => {
  const { originalname, } = req.file;
  let productadd = new Product({
    title: req.body.title,
    brand: req.body.brand,
    price: req.body.price,
    rating: req.body.rating,
    description: req.body.description,
    thumbnail: `http://localhost:2000/thumbnails/${originalname}`
  })
  let resp = await productadd.save();

  // Save the uploaded image to disk
  const imagePath = path.join(__dirname, "../", 'public', 'thumbnails', originalname);
  fs.createReadStream(req.file.path).pipe(fs.createWriteStream(imagePath));
  res.send(resp)
})
product.post('/delete',dleteproduct)
product.put('/:id',UpdatedProduct)
module.exports = product