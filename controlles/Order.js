let Order = require("../db/Orders")
let addorder =  async (req, res) => {
    let getproduct = new Order({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        country: req.body.country,
        address: req.body.address,
        city: req.body.city,
        zipcode: req.body.zipcode,
        date:req.body.date  
    }) 
    let productsave =  await getproduct.save()
       res.send(productsave)
}
let getallorder = async (req,res) =>{
let getallorder = await Order.find().exec()
res.send(getallorder) 
} 
let changestatus =  async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = {
    addorder,
    getallorder,
    changestatus
}