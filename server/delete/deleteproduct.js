const Product = require('../model/admin'); // Assuming you have a model named "Product"
exports.deletedata = async (req, res) => {
  try {
    const pid = req.params.productId;
    console.log(req.params.productId)
    const deldata=await Product.findByIdAndDelete({_id:pid}) // Assuming the model's name is "Product"
    console.log(deldata)
    res.send({status:200})
  } catch (e) {
    console.log(e)
  }
};
