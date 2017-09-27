const express = require('express');
const router = express.Router();
const imgur = require('../services/imgur.js');
const History = require('../models/history.js');
const path = require('path');

router.get("/", function (request, response) {
  console.log(__dirname);
  response.sendFile(path.join(__dirname, '../views/index.html'));
});

router.get("/api/latest", function(request, response) {
  History.find({}, 'term when -_id').limit(10).sort('-when').then((data) => {
    response.end(JSON.stringify(data))
  }).catch((error)=> {
    console.error(error);
    response.end();
  });
});

router.get("/api/search/:q", function (req, res) {
  imgur.getImages(req.params.q, req.query.offset).then((result) => {
    new History({ term: req.params.q}).save();
    res.end(JSON.stringify(result));
  }).catch((error) => {
    console.log(error);
    res.end();
  });
});

module.exports = router;
