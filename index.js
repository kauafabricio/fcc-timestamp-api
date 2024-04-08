
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
app.get("/api/:date", function (req, res) {
  let unixTimestamp = moment(req.params.date);
  res.json({"unix": unixTimestamp.startOf("day").unix(),
  "utc": unixTimestamp.format("ddd, DD MMM YYYY HH:mm:ss [GMT]")});
});

app.get('/api/unix/:unix', (req, res) => {
  try {
    let unixTimestamp = parseInt(req.params.unix);
    res.json({"unix": unixTimestamp,
        "utc": moment.unix(unixTimestamp)
        .format('ddd, DD MMM YYYY HH:mm:ss [GMT]')});
  } catch (error) {
    res.status(400).json({"error": "O código Unix fornecido é inválido!"});
  }
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
