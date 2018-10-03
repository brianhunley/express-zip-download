const express = require('express')
const moment = require('moment');
const path = require('path');
const zip = require('express-zip');
const zipEasy = require('express-easy-zip');
const app = express()
const port = 3000

app.get('/', (req, res) => res.send(
  '<h3>NPM "express-zip" and "express-easy-zip" Example Code</h3>' +
  '<p><a href="/getzip">Zip and Download Using Express-Zip</a></p> ' +
  '<p><a href="/getzip2">Zip and Download Using Express-Easy-Zip</a></p>'
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

app.use(zipEasy());
app.get('/getzip2', (req, res) => {
    // console.log('router post zip');
    console.log(req.body);

    //res.json({
    //   msg: "Yep, data receipt confirmed"
    //});

    // const downloads = req.body.downloads;

    const currDateTime = moment().format('YYYY-MM-DD_HH-mm-ss');
    console.log(currDateTime);

    res.zip({
      files: [
        { path: path.join(__dirname, './files/'), name: '/' },
        { path: path.join(__dirname, './images/'), name: '/' }
      ],
      filename: `sulimo-logs-${currDateTime}.zip`
    })
    .then(obj => {
      const zipFileSizeInBytes = obj.size;
      const ignoredFileArray = obj.ignored;

      console.log(`Zipfile download complete!  The zipfile size is ${zipFileSizeInBytes}.`);
    })
    .catch((err) => {
      console.log(err); // if zip fails
    });
});

app.listen(port, () => console.log(`Express Server listening on port ${port}...`));