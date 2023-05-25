const multer = require('multer');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Specify the directory where you want to store the uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name as the name of the uploaded file
  }
});

const upload = multer({ storage: storage }).single('image'); // 'image' is the name attribute of the file input field in the form

const Product = require('../model/admin');
exports.updatedata = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      // Handle multer errors, if any
      console.log(err);
      return res.status(400).json({ error: 'Error uploading file' });
    }

    try {
      const pid = req.params.productId;
      const { name, model, year, place } = req.body;
      const { filename } = req.file;
  
      const updatedProduct = await Product.findByIdAndUpdate(pid, {
        name,
        image: filename,
        model,
        year,
        place,
      });
  
      res.json("done");
      console.log('Data updated');
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: 'Error updating product' });
    }
  });
};
