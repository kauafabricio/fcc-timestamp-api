
// init project
var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200})); 

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// timestamp api

app.get('/api', (req, res) => {
  res.json({
    "unix": new Date().getTime(),
    "utc": new Date().toUTCString()
  });
});

app.get('/api/:date?', (req, res) => {
  let input = req.params.date
  let regex = /^[0-9]+$/
  if (regex.test(input)) {
    let unix = parseInt(input)
    if (unix) {
      res.json({
        "unix": unix,
        "utc": new Date(unix).toUTCString()
      });
    }
  } else {
    let date = new Date(input)
    if (date.toUTCString() === "Invalid Date") {
      res.status(400).json({
        "error": "Invalid Date"
      })
    } else {
      res.json({
        "unix": date.getTime(),
        "utc": date.toUTCString()
      });
    }
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
