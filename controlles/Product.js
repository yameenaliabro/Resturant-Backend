let Product  = require("../db/Product")
let multer = require("multer")
const upload = multer({ dest: 'uploads/' })
 let dleteproduct =  async (req, res) => {
    try {
      const { productId } = req.body;
      const deletedProduct = await   Product.findOneAndDelete({ _id: productId });
      res.json(deletedProduct);
    } catch (error) {
    }
  };
  let uplodasingle = upload.single("thumbnails")
let addproduct = uplodasingle; async (req, res) => {
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
    const imagePath = path.join(__dirname, ".../", 'public', 'thumbnails', originalname);
    fs.createReadStream(req.file.path).pipe(fs.createWriteStream(imagePath));
    res.send(resp)
  }
  let getallproduct = async (req, res) => {
    let product = await Product.find().exec();
    res.send(product)
  }
  let UpdatedProduct = (req, res) => {
    const id = req.params.id;
    const updates = {
      title  : req.body.title,
      description : req.body.description,
      price  : req.body.price,
      rating  : req.body.rating,
      brand  : req.body.brand ,
      thumbnail: req.body.thumbnail,
    };
    Product.findByIdAndUpdate(req.params.id, updates, { new: true })
      .then((product) => {
        res.json(product);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error updating product.");
      });
  }
  let checkstatus =  async (req, res) => {
    try {
      const application = await Application.findById(req.params.id);
      if (!application) {
        return res.status(404).json({ error: 'Application not found' });
      }
      res.json({ status: application.status });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  module.exports={
    dleteproduct,
    addproduct,
    getallproduct,
    UpdatedProduct,checkstatus
  }