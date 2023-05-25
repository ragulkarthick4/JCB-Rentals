const adminmodel = require('../model/admin');
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

exports.uploadAdminData = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      // Handle multer errors, if any
      console.log(err);
      return res.status(400).json({ error: 'Error uploading file' });
    }

    console.log(req.body);
    const { name,model,year,place} = req.body;
    const { filename } = req.file; // Retrieve the filename of the uploaded image

    const data = {
      name: name,
      image: filename, // Store the filename in the 'image' field of the data object
      model: model,
      year: year,
      place: place
    };

    try {
      await adminmodel.create(data);
      res.json('done');
      console.log('Data inserted');
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: 'Server error' });
    }
  });
};
