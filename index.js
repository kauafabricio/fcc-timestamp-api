
// init project
var express = require('express');
var app = express();
var moment = require('moment');

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200})); 

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// timestamp api
app.get("/api/hello", function (req, res) {
  res.json({"unix": moment().startOf("day").unix(),
  "utc": new Date()});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
