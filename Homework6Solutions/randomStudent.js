/* A simple web server to return random rolls of the dice.
   You cannot use templates in this exercise. */

var express = require('express');
var app = express();
host = '127.0.8.1'; // Choose a different loopback address
port = '2399'; // Last digits of my NetID is : 9932 so that I cannot use!!!!!
num = 0 ;
function getRandomInt(max) { // From 1 to max
  return Math.floor(Math.random() * Math.floor(max) + 1);
}

app.get('/', function (req, res) {
    num = getRandomInt(6);
    res.send(`<p>Hello Web System! From address 127.0.8.1 and port 2399</p><p>This is from the Dice Roller Application</p><p>Initial Roll:${num}</p><br><br><br><br><p>!!!Last digits of my NetID is : 9932 so that I cannot use. I use 2399 instead.</p> `);
});

app.get('/one', function (req, res) {
	 num1 = getRandomInt(6);
     res.send(`<p>You rolled:${num1} </p>`);
});
app.get('/two', function (req, res) {
    //num = getRandomInt(6);
	num2 = getRandomInt(6);
     res.send(`<p>You rolled:${num2} and ${num1} </p>`);
});

// Other view functions as needed here.


app.listen(port, host, function () {
    console.log("Example app listening on IPv4: " + host +
	":" + port);
});