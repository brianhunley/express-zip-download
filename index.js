const express = require('express')
const zip = require('express-zip');
const app = express()
const port = 3000

app.get('/', (req, res) => res.send(
  '<h3>Welcome to the Express Zipfile Download Example Code!</h3>' +
  '<a href="/getzip">Download Zip</a>'
));

app.get('/getzip', (req, res) => {
  res.zip([
    { path: 'files/file_1.txt', name: 'files/test/file_1.txt' },
    { path: 'files/file_2.txt', name: 'file_1.txt' },
    { path: 'images/f35.png', name: 'images/f35.png' }
  ],
  'express_zip_download_example.zip',
  (err, bytesZipped) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Zipfile download complete!  The zipfile size is ${bytesZipped}.`)
    };
  });
});

app.listen(port, () => console.log(`Express Server listening on port ${port}...`));