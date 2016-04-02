var express = require('express');
var path = require('path');
var app = express();

app.set('views', path.join(__dirname, 'src', 'jade'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function (req, res) {
  res.render('index', {});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});