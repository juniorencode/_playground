const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
app.use(cors()); // allows incoming request from any IP

const uploads = multer({ dest: __dirname + '/uploads' });

app.get('/', (req, res) => {
  res.json({ username: 'juniorencode' });
});

app.post('/uploads', uploads.array('files'), (req, res) => {
  console.log(req.body);
  console.log(req.files);
  res.json({ status: 'files received' });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
