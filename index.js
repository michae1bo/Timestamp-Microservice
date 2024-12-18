// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { json } = require('express/lib/response');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
//app.get("/api/hello", function (req, res) {
//  res.json({greeting: 'hello API'});
//});

function formatDate(date) {
  formattedDate = date.toString().slice(0, 28);
  formattedDate = formattedDate.slice(0, 3) + ", " + formattedDate.slice(8, 10) + " " + formattedDate.slice(4, 7) + formattedDate.slice(10)
  return formattedDate
}

app.get("/api/", function(req, res) {
  const utc = formatDate(new Date());
  res.json({unix: Date.now() , utc: utc })
})

app.get("/api/:date", function(req, res) {
  let responseJson = {};
  let unix;
  let utc;
  const date =req.params.date;
  if (date == parseInt(date)) {
      unix = parseInt(date);
      utc = formatDate(new Date(parseInt(date)));
      responseJson = { unix: unix, utc: utc }
  } else {
    requestedDate = new Date(date);
    if (isNaN(requestedDate.getTime())) {
      responseJson = { error : "Invalid Date" };
    } else {
      unix = requestedDate.getTime();
      utc = formatDate(requestedDate);
      responseJson = { unix: unix, utc: utc }
    }
    

  }
  res.json(responseJson)
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
