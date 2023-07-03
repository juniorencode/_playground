const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
app.use(cors()); // allows incoming request from any IP

const storage = multer.diskStorage({
  destination: (req, res, callback) => callback(null, __dirname + '/uploads'),
  filename: (req, file, callback) => callback(null, file.originalname)
});

const uploads = multer({ storage });

app.get('/', (req, res) => {
  res.json({ username: 'juniorencode' });
});

app.post('/uploads', uploads.array('files'), (req, res) => {
  res.json({ status: 'files received' });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
